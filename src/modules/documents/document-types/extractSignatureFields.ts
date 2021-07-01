import { SpecifiedField } from 'jexity-app/form/fields/fieldApi';

export const extractSignatureFieldNames = (fields: SpecifiedField[]): string[] => {
  const signatureFields = fields.filter((field) => field.type === 'signatureFormField');
  const targetFields = signatureFields.map((field) => field.name);
  return targetFields;
};
