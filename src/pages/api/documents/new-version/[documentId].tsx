import { AuthClass } from '@aws-amplify/auth/lib/Auth';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { APIClass, withSSRContext } from 'aws-amplify';
import removeEmptyArrayItems from 'jexity-app/utils/removeEmptyArrayItems';
import { log, LogLevel, responseErrorWithLogger } from 'jexity-app/utils/logger';
import { diff } from 'jsondiffpatch';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from 'next-connect';
import { ContractorType, CreateOnlineDocumentArchiveModelMutation, OnlineDocumentStatus } from 'src/API';
import { extractSignatureFieldNames } from 'src/modules/documents/document-types/extractSignatureFields';
import getDocSchemaByDocType from 'src/modules/documents/document-types/getDocSchemaByDocType';
import {
  createArchivedDocument,
  createPatch,
  deleteArchivedDocument,
  requestDocumentWithPatchesById,
  updateDocument,
} from 'src/modules/documents/documentService';
import patcher from 'src/modules/documents/utils/patcher';
import { SimpleError } from 'src/utils/type-utils/SimpleError';
import { PromiseValue } from 'type-fest';
import 'src/AmplifyConfig';
import { extractClientInfo } from 'src/modules/client/clientService';

export type NewVersionHandlerResponse = NonNullable<
  CreateOnlineDocumentArchiveModelMutation['createOnlineDocumentArchiveModel']
>;

const newVersionHandler = handler<NextApiRequest, NextApiResponse<NewVersionHandlerResponse | SimpleError>>().post(
  async (req, res) => {
    const SSRContext = withSSRContext({ req });
    const API = SSRContext.API as APIClass;
    const Auth = SSRContext.Auth as AuthClass;
    const { query } = req;

    const documentId = query.documentId; // OnlineDocumentModel
    if (typeof documentId !== 'string') {
      responseErrorWithLogger(res, {
        status: 400,
        label: 'newVersionHandler',
        type: 'MALFORMED_DOCUMENT_ID',
        message: 'The documentId passed to newVersionHandler is invalid',
      });
      return;
    }

    const contractor = query.contractor; // Contractor Type
    if (!(contractor === ContractorType.PRIMARY || contractor === ContractorType.SECONDARY)) {
      responseErrorWithLogger(res, {
        status: 400,
        label: 'newVersionHandler',
        type: 'MALFORMED_CONTRACTOR',
        message: 'The contractor passed to newVersionHandler is invalid',
      });
      return;
    }

    let document: PromiseValue<ReturnType<typeof requestDocumentWithPatchesById>> | undefined = undefined;

    try {
      document = await requestDocumentWithPatchesById(documentId, API);
    } catch (e) {
      responseErrorWithLogger(res, {
        status: 400,
        label: 'newVersionHandler',
        type: 'ERROR_REQUESTING_DOCUMENT',
        message: `The document with id of ${documentId} threw an error`,
        ...e,
      });
    }

    if (!document) {
      responseErrorWithLogger(res, {
        status: 404,
        label: 'newVersionHandler',
        type: 'NO_DOCUMENT_FOUND',
        message: `The document with id of ${documentId} was not found`,
      });
      return;
    }

    if (!document.patches?.items) {
      responseErrorWithLogger(res, {
        status: 400,
        label: 'newVersionHandler',
        type: 'DOCUMENT_HAS_NO_PATCHES',
        message: `We can't archive a document that doesn't have any patches/values`,
      });
      return;
    }

    const rollbacks: { identifier: string; cb: () => Promise<void> }[] = [];
    const fireRollbacks = async () => {
      for (let x = 0; x < rollbacks.length; x++) {
        const roll = rollbacks[x];
        // eslint-disable-next-line no-console
        try {
          await roll.cb();
        } catch (e) {
          log(LogLevel.error, e.message, e);
        }
      }
    };

    const authenticatedUser = (await Auth.currentAuthenticatedUser()) as CognitoUser;

    const { clientId, client, values, id, title, type } = document;
    const patches = document.patches.items.filter(removeEmptyArrayItems);

    const editors = [authenticatedUser.getUsername()];
    if (client.sub) {
      editors.push(client.sub);
    }

    let archiveResponse: PromiseValue<ReturnType<typeof createArchivedDocument>> = undefined;
    let updateOriginalResponse: PromiseValue<ReturnType<typeof updateDocument>> | undefined = undefined;
    let clearSignPatchResponse: PromiseValue<ReturnType<typeof createPatch>> | undefined = undefined;

    /**
     * Create a new archive copy of the document
     */
    try {
      const compiledValue = await patcher(values, patches);

      archiveResponse = await createArchivedDocument(
        {
          documentId: id,
          clientId,
          owner: authenticatedUser.getUsername(),
          title,
          values: JSON.stringify(compiledValue),
          editors,
          type,
          version: document.version ?? 1,
          contractor: document.contractor,
        },
        API
      );

      if (archiveResponse) {
        const archivedId = archiveResponse.id;
        rollbacks.push({
          identifier: 'Rolling back create archive document',
          cb: async () => {
            await deleteArchivedDocument(archivedId, API);
          },
        });
      } else {
        throw new Error('CreateOnlineDocumentArchiveModelMutation returned an empty response');
      }
    } catch (e) {
      await fireRollbacks();
      responseErrorWithLogger(res, {
        status: 500,
        label: 'newVersionHandler',
        type: 'FAILED_TO_CREATE_ARCHIVE_DOCUMENT',
        message: e?.message ?? 'Lock handler threw an unknown error',
        ...e,
      });
      return;
    }

    /**
     * Create a patch that deletes all signatures
     */
    try {
      const schema = getDocSchemaByDocType(document.type);
      let signatureFields: string[];
      if (schema) {
        signatureFields = extractSignatureFieldNames(schema);
        const filteredPatches = document.patches.items.filter(removeEmptyArrayItems);
        const latestValue = patcher(document.values, filteredPatches);

        const clearSignValues: Record<string, unknown> = {
          ...latestValue,
        };
        signatureFields.forEach((signField) => {
          delete clearSignValues[signField];
        });

        const clearSignPatch = diff(latestValue, clearSignValues);

        if (clearSignPatch) {
          clearSignPatchResponse = await createPatch(
            document.id,
            clearSignPatch,
            'NEW_VERSION_HANDLER',
            'NEW_VERSION_HANDLER_API',
            API
          );
          /**
           * TODO Create a delete patch function in service, we need to rollback
           * just in case
           */
          // rollbacks.push({
          //   identifier: 'Rolling back create archive document',
          //   cb: async () => {
          //     await deletePatch(clearSignPatchResponse.id, API);
          //   },
          // });
        }
      }
    } catch (e) {
      await fireRollbacks();
      responseErrorWithLogger(res, {
        status: 500,
        label: 'newVersionHandler',
        message: 'Failed to create a patch the removes all the signatures',
        type: 'FAILED_TO_CLEAR_SIGNATURES_PATCH',
      });
      return;
    }

    /**
     * Update contract values
     */

    /**
     * Update the original document
     */
    try {
      updateOriginalResponse = await updateDocument(
        {
          id: document.id,
          status: OnlineDocumentStatus.INCOMPLETE,
          version: (document.version ?? 1) + 1,
          contractor: contractor,
        },
        API
      );
      if (!updateOriginalResponse) {
        throw new Error('UpdateOnlineDocumentModelMutation returned an empty response');
      }

      const contractorInfo = extractClientInfo(client, contractor);

      /**
       * Create a patch for the selected contractor
       */
      try {
        const originalDocument = await requestDocumentWithPatchesById(updateOriginalResponse.id, API);

        if (!originalDocument) {
          responseErrorWithLogger(res, {
            status: 404,
            label: 'newVersionHandler',
            type: 'NO_ORIGINAL_DOCUMENT_FOUND',
            message: `The document with id of ${updateOriginalResponse.id} was not found`,
          });
          return;
        }

        if (!originalDocument.patches?.items) {
          responseErrorWithLogger(res, {
            status: 400,
            label: 'newVersionHandler',
            type: 'ORIGINAL_DOCUMENT_HAS_NO_PATCHES',
            message: `We can't archive a document that doesn't have any patches/values`,
          });
          return;
        }

        const filteredPatches = originalDocument.patches.items.filter(removeEmptyArrayItems);
        const latestValue = patcher(updateOriginalResponse.values, filteredPatches);

        const contractorValues: Record<string, unknown> = {
          ...latestValue,
          ...contractorInfo,
        };

        const contractorPatch = diff(latestValue, contractorValues);

        if (contractorPatch) {
          await createPatch(document.id, contractorPatch, 'NEW_VERSION_HANDLER', 'NEW_VERSION_HANDLER_API', API);
        }
      } catch (e) {
        await fireRollbacks();
        responseErrorWithLogger(res, {
          status: 500,
          label: 'newVersionHandler',
          message: 'Failed to create a patch for the selected contractor',
          type: 'FAILED_TO_SET_CONTRACTOR_PATCH',
        });
        return;
      }
    } catch (e) {
      await fireRollbacks();
      responseErrorWithLogger(res, {
        status: 500,
        label: 'newVersionHandler',
        type: 'FAILED_TO_CREATE_ARCHIVE_DOCUMENT',
        message: e?.message ?? 'New version handler threw an unknown error',
        ...e,
      });
      return;
    }

    res.status(200).json(archiveResponse);
  }
);

export default newVersionHandler;
