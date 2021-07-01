import { createContext, Dispatch, useContext } from 'react';

/**
 * This context is intended for reaching deeply nested fields
 */

export type FieldsMetaValue = {
  readOnly?: boolean;
  focusedField?: string;
  setFocusedField?: Dispatch<React.SetStateAction<FieldsMetaValue['focusedField']>>;
};

export const FieldsMetaContext = createContext<FieldsMetaValue>({
  readOnly: false,
});

export const FieldsMetaProvider = FieldsMetaContext.Provider;

export const useFieldsMeta = (): FieldsMetaValue => useContext(FieldsMetaContext);
