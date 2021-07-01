import { jsonParseWithFallback } from 'jexity-app/utils/jsonParseWithFallback';
import { Delta, patch } from 'jsondiffpatch';
import { log, LogLevel } from 'jexity-app/utils/logger';
import DocumentModel, { DocumentPatchModel } from '../api/DocumentModel';

const patcher = (values: DocumentModel['values'], documentPatches: DocumentPatchModel[]): any => {
  let patchedValue = jsonParseWithFallback(values, {});

  documentPatches.forEach((documentPatch) => {
    const delta: Delta = JSON.parse(documentPatch.patch);
    try {
      patchedValue = patch(patchedValue, delta);
    } catch (e) {
      log(LogLevel.error, e, { label: 'Patcher', ...e });
    }
  });
  return patchedValue;
};

interface HasCreatedAt {
  createdAt: string;
}
export const sortByCreatedAt = (a: HasCreatedAt, b: HasCreatedAt): 1 | -1 => {
  const dateA = new Date(a.createdAt).getTime();
  const dateB = new Date(b.createdAt).getTime();
  return dateA > dateB ? 1 : -1;
};

export default patcher;
