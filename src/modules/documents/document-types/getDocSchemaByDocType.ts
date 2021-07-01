import { SpecifiedField } from 'jexity-app/form/fields/fieldApi';
import { OnlineDocumentType } from 'src/API';
import { angebotImmosparenDocSchema } from './angebot-immosparen/schema';
import { doc002Schema } from './einmalanlage-geldwaeschegesetz/schema';
import { doc001Schema } from './einmalanlage-zeichnungsschein/schema';
import { investmentKompassDocSchema } from './investment-kompass/schema';
import { doc003Schema } from './ratierlich-geldwaeschegesetz/schema';
import { doc004Schema } from './ratierlich-zeichnungsschein/schema';
import { rbsScheinDFKHomeSchema } from './rbs-schein-dfk-home/schema';
import { rbsScheinDFKSafeSchema } from './rbs-schein-dfk-safe/schema';
import { rbsScheinFinanzierungSchema } from './rbs-schein-finanzierung/schema';
import { rbsScheinFullServiceImmobilieSchema } from './rbs-schein-full-service-immobilie/schema';
import { rbsScheinSonstigeSchema } from './rbs-schein-sonstige/schema';
import { rbsScheinSchema } from './rbs-schein/schema';

export type GetDocSchemaByDocType = (documentType: OnlineDocumentType | undefined) => SpecifiedField[] | null;

const getDocSchemaByDocType: GetDocSchemaByDocType = (documentType) => {
  let documentSchema: SpecifiedField[] | null = null;
  switch (documentType) {
    case OnlineDocumentType.INVESTMENT_KOMPASS:
      documentSchema = investmentKompassDocSchema;
      break;
    case OnlineDocumentType.EINMALANLAGE_ZEICHNUNGSSCHEIN:
      documentSchema = doc001Schema;
      break;
    case OnlineDocumentType.EINMALANLAGE_GELDWAESCHEGESETZ:
      documentSchema = doc002Schema;
      break;
    case OnlineDocumentType.RATIERLICH_ZEICHNUNGSSCHEIN:
      documentSchema = doc004Schema;
      break;
    case OnlineDocumentType.RATIERLICH_GELDWAESCHEGESETZ:
      documentSchema = doc003Schema;
      break;
    case OnlineDocumentType.ANGEBOT_IMMOSPAREN:
      documentSchema = angebotImmosparenDocSchema;
      break;

    // For development purposes only. Delete this once the UI for single edit is ready
    case OnlineDocumentType.RBS_SCHEIN:
      documentSchema = rbsScheinSchema;
      break;
    case OnlineDocumentType.RBS_SCHEIN_FUNDING:
      documentSchema = rbsScheinFinanzierungSchema;
      break;
    case OnlineDocumentType.RBS_SCHEIN_OTHER:
      documentSchema = rbsScheinSonstigeSchema;
      break;
    case OnlineDocumentType.RBS_SCHEIN_FULLSERVICE:
      documentSchema = rbsScheinFullServiceImmobilieSchema;
      break;
    case OnlineDocumentType.RBS_SCHEIN_DFK_HOME:
      documentSchema = rbsScheinDFKHomeSchema;
      break;
    case OnlineDocumentType.RBS_SCHEIN_DFK_SAFE:
      documentSchema = rbsScheinDFKSafeSchema;
      break;
  }
  return documentSchema;
};

export default getDocSchemaByDocType;
