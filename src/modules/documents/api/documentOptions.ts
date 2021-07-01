import { OnlineDocumentType } from 'src/API';
import { ProductGroupType } from './productGroupType';

export interface DocumentOption {
  type: OnlineDocumentType;
  title: string;
  productGroup: string;
  isActive: boolean;
}

export interface ProductImmosparenDocuments extends Omit<DocumentOption, 'type' | 'productGroup'> {
  src: string;
  size: string;
  isActive: boolean;
  updatedAt: Date;
}

export const documentOptions: DocumentOption[] = [
  {
    productGroup: ProductGroupType.COMMON,
    type: OnlineDocumentType.INVESTMENT_KOMPASS,
    title: 'Investment Kompass',
    isActive: true,
  },
  {
    productGroup: ProductGroupType.IMMOSPAREN,
    type: OnlineDocumentType.EINMALANLAGE_ZEICHNUNGSSCHEIN,
    title: 'Einmalanlage - Zeichnungs- und Begebungsschein',
    isActive: false,
  },
  {
    productGroup: ProductGroupType.IMMOSPAREN,
    type: OnlineDocumentType.EINMALANLAGE_GELDWAESCHEGESETZ,
    title: 'Einmalanlage - Erklärung zum Geldwäschegesetz',
    isActive: false,
  },
  {
    productGroup: ProductGroupType.IMMOSPAREN,
    type: OnlineDocumentType.RATIERLICH_ZEICHNUNGSSCHEIN,
    title: 'Ratierlich - Zeichnungs- und Begebungsschein',
    isActive: true,
  },
  {
    productGroup: ProductGroupType.IMMOSPAREN,
    type: OnlineDocumentType.RATIERLICH_GELDWAESCHEGESETZ,
    title: 'Ratierlich - Erklärung zum Geldwäschegesetz',
    isActive: true,
  },
  {
    productGroup: ProductGroupType.IMMOSPAREN,
    type: OnlineDocumentType.ANGEBOT_IMMOSPAREN,
    title: 'Angebot Immosparen',
    isActive: true,
  },
  {
    productGroup: ProductGroupType.IMMOSPAREN,
    type: OnlineDocumentType.RBS_SCHEIN,
    title: 'RBS Schein Immosparen',
    isActive: true,
  },
  {
    productGroup: ProductGroupType.FUNDING,
    type: OnlineDocumentType.RBS_SCHEIN_FUNDING,
    title: 'RBS Schein Finanzierung',
    isActive: true,
  },
  {
    productGroup: ProductGroupType.FULLSERVICE_REAL_ESTATE,
    type: OnlineDocumentType.RBS_SCHEIN_FULLSERVICE,
    title: 'RBS Schein Full-Service Immobilie',
    isActive: true,
  },
  {
    productGroup: ProductGroupType.DFK_SAFE,
    type: OnlineDocumentType.RBS_SCHEIN_DFK_SAFE,
    title: 'RBS Schein DFK Safe',
    isActive: true,
  },
  {
    productGroup: ProductGroupType.OTHER,
    type: OnlineDocumentType.RBS_SCHEIN_OTHER,
    title: 'RBS Schein Sonstige',
    isActive: true,
  },
  {
    productGroup: ProductGroupType.OTHER,
    type: OnlineDocumentType.RBS_SCHEIN_DFK_HOME,
    title: 'RBS Schein DFK Home',
    isActive: true,
  },
];

const immosparenProportionalInvestmentDirectory = '/documents/immosparen/proportional-investment/';
const immosparenOneTimeInvestmentDirectory = '/documents/immosparen/onetime-investment/';

export const immosparenProportionalInvestmentDocuments: ProductImmosparenDocuments[] = [
  {
    title: 'Basisinformationsblatt Ratierliche Anlage',
    src: `${immosparenProportionalInvestmentDirectory}Basisinformationsblatt-ratierliche-Anlage.pdf`,
    size: '163 KB',
    isActive: true,
    updatedAt: new Date('April 15 2021 6:09'),
  },
  {
    title: 'Verbraucherinformation Ratierliche Anlage',
    src: `${immosparenProportionalInvestmentDirectory}Verbraucherinformation-ratierliche-Anlage.pdf`,
    size: '137 KB',
    isActive: true,
    updatedAt: new Date('April 15 2021 6:09'),
  },
  {
    title: 'Wertpapierprospekt Ratierliche Anlage',
    src: `${immosparenProportionalInvestmentDirectory}Wertpapierprospekt-ratierliche-Anlage.pdf`,
    size: '6.8 MB',
    isActive: true,
    updatedAt: new Date('April 15 2021 6:09'),
  },
];

export const immosparenOneTimeInvestmentDocuments: ProductImmosparenDocuments[] = [
  {
    title: 'Basisinformationsblatt Einmalanlage',
    src: `${immosparenOneTimeInvestmentDirectory}Basisinformationsblatt-Einmalanlage.pdf`,
    size: '162 KB',
    isActive: true,
    updatedAt: new Date('April 15 2021 6:03'),
  },
  {
    title: 'Verbraucherinformation Einmalanlage',
    src: `${immosparenOneTimeInvestmentDirectory}Verbraucherinformation-Einmalanlage.pdf`,
    size: '136 KB',
    isActive: true,
    updatedAt: new Date('April 15 2021 6:03'),
  },
  {
    title: 'Wertpapierprospekt Einmalanlage',
    src: `${immosparenOneTimeInvestmentDirectory}Wertpapierprospekt-Einmalanlage.pdf`,
    size: '162 KB',
    isActive: true,
    updatedAt: new Date('April 15 2021 6:03'),
  },
];

/**
 * Array of document types that does not need to select
 * contractor 1 or 2 when creating the document.
 */
export const documentsWithoutContractorSelection = [
  OnlineDocumentType.INVESTMENT_KOMPASS,
  OnlineDocumentType.RBS_SCHEIN_FULLSERVICE,
];

/**
 * Array of document types that allow to agent only.
 */
export const agentSpecificDocumentTypes = [
  OnlineDocumentType.RBS_SCHEIN,
  OnlineDocumentType.RBS_SCHEIN_FUNDING,
  OnlineDocumentType.RBS_SCHEIN_OTHER,
  OnlineDocumentType.RBS_SCHEIN_FULLSERVICE,
  OnlineDocumentType.RBS_SCHEIN_DFK_HOME,
  OnlineDocumentType.RBS_SCHEIN_DFK_SAFE,
];

export const isAgentSpecificDocument = (type: OnlineDocumentType): boolean => {
  return agentSpecificDocumentTypes.includes(type);
};

export const hasContractorSelection = (type: OnlineDocumentType): boolean => {
  return !documentsWithoutContractorSelection.includes(type);
};
