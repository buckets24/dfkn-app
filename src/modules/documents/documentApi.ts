import { FieldValues } from 'jexity-app/form/fields/fieldApi';
import { Delta } from 'jsondiffpatch';
import { DocumentPatchModel } from './api/DocumentModel';
import DocumentModel from './api/DocumentModel';
import { createPatch } from './documentService';
import { PromiseValue } from 'type-fest';

type CreatePatchResponse = PromiseValue<ReturnType<typeof createPatch>>;

export interface EditModeForm {
  printMode?: false;
  activeDocumentId: DocumentModel['id'];
  onChange?: (docFieldValues: FieldValues) => void;
  onNewDelta?: (
    delta: Delta,
    uniqueEditorInstance: NonNullable<DocumentPatchModel['uniqueEditorInstance']>
  ) => Promise<CreatePatchResponse>;
}

export interface PrintModeForm {
  printMode: true;
  activeDocumentId: DocumentModel['id'];
  onChange?: undefined;
  onNewDelta?: undefined;
}

export type PrintMode = { printMode?: boolean; readOnly?: boolean; activeDocumentId: DocumentModel['id'] | undefined };
