import API from '@aws-amplify/api';
import { FormikProps, FormikValues } from 'formik';
import produce from 'immer';
import { SpecifiedField } from 'jexity-app/form/fields/fieldApi';
import { FieldsMetaProvider, FieldsMetaValue, useFieldsMeta } from 'jexity-app/form/useFieldsMeta';
import { SpecialFormikContext, SpecialFormikContextProvider } from 'jexity-app/form/useFormikByName';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { diff, patch } from 'jsondiffpatch';
import React, { FC, memo, useEffect, useMemo, useState } from 'react';
import { OnlineDocumentStatus } from 'src/API';
import queryClient from 'src/queryClient';
import { useContext } from 'use-context-selector';
import { v4 } from 'uuid';
import { getMe, useAuthStore } from '../auth/authStore';
import { DocumentPatchModel } from './api/DocumentModel';
import { EditModeForm, PrintModeForm } from './documentApi';
import { updateDocument } from './documentService';
import useDocumentPatchesByDocumentIdQuery, {
  UseDocumentPatchesByDocumentIdQueryResult,
} from './query-hooks/useDocumentPatchesByDocumentIdQuery';
import useDocumentByIdQuery from './query-hooks/useDocumentByIdQuery';
import useDocumentsByClientIdQuery from './query-hooks/useDocumentsByClientIdQuery';
import { DocFormMetaContext } from './useDocFormMeta';
import patcher, { sortByCreatedAt } from './utils/patcher';
import syncClientInfo from './document-types/common/syncClientInfo';

interface DocumentSchema {
  schema: SpecifiedField[];
  initialValues: Record<string, any>;
}
export type DocumentFormProviderProps = DocumentSchema & FieldsMetaValue & (EditModeForm | PrintModeForm);

/**
 * MEMOIZED COMPONENT
 */
const DocumentForm: FC<Pick<EditModeForm, 'onNewDelta'> & { activeDocumentId: string }> = memo(
  ({ children, onNewDelta, activeDocumentId }) => {
    const [formSession] = useState<string>(v4());
    const me = useAuthStore(getMe);
    const [inc, setInc] = useState(0);

    const { values, setValues } = useContext(SpecialFormikContext) as FormikProps<FormikValues>;
    const { readOnly } = useFieldsMeta();
    const [localPatch, setLocalPatch] = useState<DocumentPatchModel | undefined>();
    const activeDocument = useDocumentByIdQuery(activeDocumentId, {
      enabled: false,
    });
    const activeDocumentPatches = useDocumentPatchesByDocumentIdQuery(activeDocumentId, {
      enabled: false,
    });
    const documents = useDocumentsByClientIdQuery(activeDocument.data?.clientId, {
      enabled: false,
    });

    useEffect(() => {
      if (me?.id && activeDocumentId && activeDocument.data?.values && activeDocumentPatches.data) {
        const patchedValue = patcher(activeDocument.data.values, activeDocumentPatches.data);
        const delta = diff(patchedValue, values);
        if (delta) {
          setLocalPatch({
            id: 'LOCAL',
            author: me.id,
            documentId: activeDocumentId,
            patch: JSON.stringify(delta),
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            uniqueEditorInstance: formSession,
          });
        } else {
          setLocalPatch(undefined);
        }
      } else {
        setLocalPatch(undefined);
      }
    }, [setLocalPatch, values]);

    useEffect(() => {
      if (activeDocumentPatches.data && activeDocument.data) {
        const numberOfPatches = activeDocumentPatches.data.length;
        if (
          numberOfPatches > 0 &&
          activeDocumentPatches.data[numberOfPatches - 1]?.uniqueEditorInstance === formSession
        ) {
          /**
           * What if we ignore the last value because it was "me" anyway
           */
          return;
        }

        const patchedValue = patcher(activeDocument.data.values, activeDocumentPatches.data);

        if (Object.values(values).length === 0) {
          setValues(patchedValue);
          return;
        }

        const lastPatch = numberOfPatches > 1 ? activeDocumentPatches.data[numberOfPatches - 1] : undefined;

        if (localPatch && lastPatch?.uniqueEditorInstance !== formSession) {
          const patchesWithLocalPatch = [...activeDocumentPatches.data, localPatch];
          patchesWithLocalPatch.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return dateA > dateB ? 1 : -1;
          });
          setValues(patchedValue);
        } else {
          setValues(patchedValue);
        }
        if (activeDocument.data.status === OnlineDocumentStatus.CLEAN) {
          void documents.refetch();
        }
      }
      /**
       * Intentionally don't fire effect if values changes.
       */
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeDocumentPatches.data]);

    useEffect(() => {
      const timeout = setTimeout(async () => {
        try {
          if (Object.values(values).length === 0) {
            return;
          }

          if (!(activeDocumentPatches.data && activeDocument.data?.values)) {
            return;
          }

          let patchedValue = patcher(activeDocument.data.values, activeDocumentPatches.data);
          const deltaValuesVsPatch = diff(patchedValue, values);
          const { contractor, client } = activeDocument.data;

          if (deltaValuesVsPatch && contractor) {
            patchedValue = patch(patchedValue, deltaValuesVsPatch);
            await syncClientInfo(contractor, client, patchedValue);
          }
        } catch (e) {
          log(LogLevel.error, e, { label: 'syncClientInfo', ...e });
        }
      }, 1000);

      return () => clearTimeout(timeout);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      values.title,
      values.salutation,
      values.firstName,
      values.lastName,
      values.maritalStatus,
      values.birthPlace,
      values.birthday,
      values.taxId,
      values.telephone,
      values.fax,
      values.mobile,
      values.postCode,
      values.place,
      values.streetHouseNumber,
      values.country,
      values.addressValidDate,
      values.nationality,
      values.contractorTitle,
      values.contractorFirstName,
      values.contractorLastName,
      values.contractorMaritalStatus,
      values.contractorBirthPlace,
      values.contractorBirthDate,
      values.contractorTaxID,
      values.contractorNationality,
    ]);

    useEffect(() => {
      /**
       * Think of this as an update cycle. Instead of watching for
       * value changes in formik, we "pick it up". Before we do any
       * changes though we make sure we first compare the values to
       * the latest values from the document patches. If there is a
       * difference we set the value to the latest patch + the client's
       * change and then push the difference (aka delta) to the document
       * patches. This guarantees sync.
       *
       * We also wait for the new patch to be pushed to the server before
       * we fire another update cycle. To prevent race conditions.
       */
      if (onNewDelta) {
        const timeout = setTimeout(async () => {
          try {
            if (Object.values(values).length === 0) {
              return;
            }

            if (activeDocumentPatches.data && activeDocument.data?.values) {
              let patchedValue = patcher(activeDocument.data.values, activeDocumentPatches.data);
              const deltaValuesVsPatch = diff(patchedValue, values);

              if (deltaValuesVsPatch) {
                patchedValue = patch(patchedValue, deltaValuesVsPatch);
                setValues(patchedValue);
                const patchModel = await onNewDelta(deltaValuesVsPatch, formSession);
                if (patchModel) {
                  // const { contractor, client } = activeDocument.data;

                  // if (contractor) {
                  //   await syncClientInfo(contractor, client, patchedValue);
                  // }

                  await queryClient.setQueryData<UseDocumentPatchesByDocumentIdQueryResult>(
                    ['patches', activeDocumentId],
                    (currentPatches) => {
                      const updatedPatches = produce(currentPatches, (draftPatches) => {
                        draftPatches?.push(patchModel);
                        draftPatches?.sort(sortByCreatedAt);
                        return draftPatches;
                      });
                      return updatedPatches;
                    }
                  );
                  /**
                   * Setting document status. Not yet sure where best to put
                   * this
                   */
                  if (activeDocument.data.status === OnlineDocumentStatus.CLEAN) {
                    await updateDocument(
                      {
                        id: activeDocument.data.id,
                        status: OnlineDocumentStatus.INCOMPLETE,
                      },
                      API
                    );
                    void documents.refetch();
                  }
                }
              }
            }
            setInc(inc + 1);
          } catch (e) {
            log(LogLevel.error, e, { label: 'DocumentUpdateCycle', ...e });
          }
        }, 1000);

        return () => clearTimeout(timeout);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inc, values]);

    return (
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <fieldset disabled={readOnly}>{children}</fieldset>
      </form>
    );
  }
);

/**
 * MAIN COMPONENT
 */
export const DocumentFormProvider: FC<DocumentFormProviderProps> = memo(
  ({ children, initialValues, printMode = false, readOnly = false, activeDocumentId, onNewDelta }) => {
    const [focusedField, setFocusedField] = useState<string>();
    const printModeMemo = useMemo(() => ({ printMode, readOnly, activeDocumentId }), [
      printMode,
      readOnly,
      activeDocumentId,
    ]);
    const fieldsMetaMemo = useMemo<FieldsMetaValue>(() => ({ readOnly, focusedField, setFocusedField }), [
      focusedField,
      setFocusedField,
      readOnly,
    ]);

    return (
      <FieldsMetaProvider value={fieldsMetaMemo}>
        <DocFormMetaContext.Provider value={printModeMemo}>
          <SpecialFormikContextProvider initialValues={initialValues}>
            <DocumentForm onNewDelta={onNewDelta} activeDocumentId={activeDocumentId}>
              {children}
            </DocumentForm>
          </SpecialFormikContextProvider>
        </DocFormMetaContext.Provider>
      </FieldsMetaProvider>
    );
  }
);
