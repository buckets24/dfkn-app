import API from '@aws-amplify/api';
import { Box, Button, Flex, FlexProps } from '@chakra-ui/react';
import { CloseIcon } from 'jexity-app/icons/CloseIcon';
import { log, LogLevel } from 'jexity-app/utils/logger';
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { useAuthStore } from 'src/modules/auth/authStore';
import getDocSchemaAndComponent, { GetDocument } from 'src/modules/documents/document-types/getDocSchemaAndComponent';
import { DocumentActions } from 'src/modules/documents/DocumentActions';
import { DocumentFormProvider, DocumentFormProviderProps } from 'src/modules/documents/DocumentFormProvider';
import { createPatch } from 'src/modules/documents/documentService';
import useDocumentByIdQuery from 'src/modules/documents/query-hooks/useDocumentByIdQuery';
import useDocumentPatchesByDocumentIdQuery from 'src/modules/documents/query-hooks/useDocumentPatchesByDocumentIdQuery';
import DocumentCreateWatcher from 'src/modules/documents/watchers/DocumentCreateWatcher';
import DocumentPatchCreateWatcher from 'src/modules/documents/watchers/DocumentPatchCreateWatcher';
import DocumentUpdateWatcher from 'src/modules/documents/watchers/DocumentUpdateWatcher';

export interface DocumentRendererProps {
  activeDocumentId: string;
  autoScroll?: boolean;
  onDocumentScroll?: (scrollPos: number, scrollPosPercent: number) => void;
  scrollPosPercent?: number;
  onCloseDocument?: () => void;
  allowedToScroll: boolean;
}

export const DocumentRenderer: FC<DocumentRendererProps> = ({
  activeDocumentId,
  autoScroll = false,
  onDocumentScroll,
  scrollPosPercent,
  allowedToScroll,
  onCloseDocument,
}) => {
  const me = useAuthStore((state) => state.me);
  const localScrollElRef = useRef<HTMLDivElement | null>(null);
  const scrollContentEl = useRef<HTMLDivElement | null>(null);
  const activeDocument = useDocumentByIdQuery(activeDocumentId, {
    enabled: false,
  });
  useDocumentPatchesByDocumentIdQuery(activeDocumentId, {
    enabled: false,
  });

  const handleScroll = useCallback<NonNullable<FlexProps['onScroll']>>(
    (e) => {
      if (scrollContentEl.current && onDocumentScroll) {
        const el = e.currentTarget;
        const percentage = parseFloat(((el.scrollTop / scrollContentEl.current.offsetHeight) * 100).toFixed(2));
        onDocumentScroll(el.scrollTop, percentage);
      }
    },
    [onDocumentScroll]
  );

  useEffect(() => {
    if (typeof scrollPosPercent === 'number' && scrollContentEl.current && autoScroll) {
      const top = (scrollPosPercent / 100) * scrollContentEl.current.offsetHeight;

      localScrollElRef.current?.scrollTo({
        behavior: 'smooth',
        top,
      });
    }
  }, [scrollPosPercent, autoScroll]);

  const { documentComponent, documentSchema } = useMemo<ReturnType<GetDocument>>(() => {
    return getDocSchemaAndComponent(activeDocument.data?.type);
  }, [activeDocument.data?.type]);

  const initialValues = useMemo(() => {
    return {};
  }, []);

  const onNewDelta = useCallback<NonNullable<DocumentFormProviderProps['onNewDelta']>>(
    async (delta, uniqueEditorInstance) => {
      try {
        if (me?.id && activeDocumentId) {
          return await createPatch(activeDocumentId, delta, me.id, uniqueEditorInstance, API);
        }
      } catch (e) {
        log(LogLevel.error, e, { label: 'OnNewDelta', ...e });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeDocumentId, me?.id]
  );
  useEffect(() => {
    /**
     * Disable scroll for client
     */

    if (!allowedToScroll && me?.userType === 'CLIENT') {
      const container = document.getElementById('form-document-container');
      if (container) {
        container.addEventListener('scroll', (e) => e.preventDefault(), false);
        container.addEventListener('wheel', (e) => e.preventDefault(), false);
        container.addEventListener('touchmove', (e) => e.cancelable && e.preventDefault(), false);
      }
    }
  }, []);

  if (!activeDocument.data) {
    return null;
  }

  return (
    <>
      {me?.sub && <DocumentCreateWatcher editors={[me.sub]} />}
      {me?.sub && <DocumentUpdateWatcher editors={[me.sub]} />}
      {activeDocumentId && <DocumentPatchCreateWatcher documentId={activeDocumentId} />}
      <Flex
        ref={localScrollElRef}
        bg="gray.100"
        id="form-document-container"
        pos="relative"
        justifyContent="center"
        alignItems="center"
        h="100%"
        overflowY={allowedToScroll ? 'scroll' : 'hidden'}
        overflowX="hidden"
        onScroll={handleScroll}
      >
        {onCloseDocument && (
          <Button pos="absolute" top="16px" left="16px" zIndex={1} bg="transparent" p="0" onClick={onCloseDocument}>
            <CloseIcon w="20px" h="20px" />
          </Button>
        )}
        <Box ref={scrollContentEl} pos="absolute" top={0} w="100%" py={5}>
          {documentComponent && documentSchema && (
            <DocumentFormProvider
              key={activeDocumentId}
              activeDocumentId={activeDocumentId}
              /**
               * This property will make the form read only
               */
              readOnly={activeDocument.data.status === 'LOCK'}
              initialValues={initialValues}
              schema={documentSchema}
              onNewDelta={onNewDelta}
            >
              {documentComponent}
            </DocumentFormProvider>
          )}
          {/* Spacer to allow more scroll */}
          <Box h="50vh" w="100%" />
        </Box>
      </Flex>
      {activeDocument.data.id && <DocumentActions documentId={activeDocument.data.id} />}
    </>
  );
};
