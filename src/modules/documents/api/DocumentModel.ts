import {
  GetOnlineDocumentModelQuery,
  GetOnlineDocumentsWithPatchesByClientIdQuery,
  ListDocumentPatchsQuery,
  ListOnlineDocumentModelsQuery,
} from 'src/API';
import { ResultType } from 'src/utils/type-utils/ResultType';

type DocumentItems = NonNullable<ResultType<ListOnlineDocumentModelsQuery, 'listOnlineDocumentModels'>['items']>;
export type DocumentModel = Omit<NonNullable<DocumentItems[number]>, '__typename'>;

/**
 * Potentially confusing type
 */
export type DocumentModelComplete = Omit<
  ResultType<GetOnlineDocumentModelQuery, 'getOnlineDocumentModel'>,
  '__typename'
>;

type DocumentPatchesItems = NonNullable<ResultType<ListDocumentPatchsQuery, 'listDocumentPatchs'>['items']>;
export type DocumentPatchModel = Omit<NonNullable<DocumentPatchesItems[number]>, '__typename'>;

type DocumentWithPathesItems = NonNullable<
  ResultType<GetOnlineDocumentsWithPatchesByClientIdQuery, 'getOnlineDocumentsByClientId'>['items']
>;
export type DocumentWithPatchesModel = Omit<NonNullable<DocumentWithPathesItems[number]>, '__typename'>;

export default DocumentModel;
