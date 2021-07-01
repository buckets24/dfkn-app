import { PromiseValue } from 'type-fest';
import { requestDocumentsByClientId } from './documentService';

export type Document = NonNullable<PromiseValue<ReturnType<typeof requestDocumentsByClientId>>>[number];
