import { DocumentOption } from './documentOptions';

export interface DocumentGroups {
  name: string;
  documents: DocumentOption[];
}
[];

export const ProductGroupType = {
  COMMON: 'Allgemein',
  IMMOSPAREN: 'Immosparen',
  FULLSERVICE_REAL_ESTATE: 'Full-Service Immobilie',
  FUNDING: 'Finanzierung',
  DFK_SAFE: 'DFK Safe',
  OTHER: 'Sonstige',
};

export const groupDocumentsByProduct = (documents: DocumentOption[]): DocumentGroups[] => {
  const documentGroups = new Array<DocumentGroups>();
  Object.values(ProductGroupType).forEach((group, i) => {
    documentGroups.push({
      name: group,
      documents: [],
    });
    documents.forEach((document) => {
      if (document.productGroup === group && document.isActive) {
        documentGroups[i].documents.push(document);
      }
    });
  });

  return documentGroups;
};
