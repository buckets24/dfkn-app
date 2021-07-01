import { createContext, useContext } from 'react';
import { PrintMode } from './documentApi';

/**
 * Context value will be extended as needed
 */

export const DocFormMetaContext = createContext<PrintMode>({
  activeDocumentId: undefined,
  printMode: false,
  readOnly: false,
});

export const useDocFormMeta = (): PrintMode => useContext(DocFormMetaContext);
