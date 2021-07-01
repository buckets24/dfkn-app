import { SpecifiedField } from 'jexity-app/form/fields/fieldApi';
import React, { ReactNode } from 'react';
import { InvestmentKompassDoc } from './investment-kompass/InvestmentKompassDoc';
import { investmentKompassDocSchema } from './investment-kompass/schema';
import { EinmalanlageZeichnungsschein } from './einmalanlage-zeichnungsschein/EinmalanlageZeichnungsschein';
import { doc001Schema } from './einmalanlage-zeichnungsschein/schema';
import { EinmalanlageGeldwaeschegesetz } from './einmalanlage-geldwaeschegesetz/EinmalanlageGeldwaeschegesetz';
import { doc002Schema } from './einmalanlage-geldwaeschegesetz/schema';
import { RatierlichGeldwaeschegesetz } from './ratierlich-geldwaeschegesetz/RatierlichGeldwaeschegesetz';
import { doc003Schema } from './ratierlich-geldwaeschegesetz/schema';
import { RatierlichZeichnungsschein } from './ratierlich-zeichnungsschein/RatierlichZeichnungsschein';
import { doc004Schema } from './ratierlich-zeichnungsschein/schema';
import { AngebotImmosparen } from './angebot-immosparen/AngebotImmosparen';
import { angebotImmosparenDocSchema } from './angebot-immosparen/schema';
import { OnlineDocumentType } from 'src/API';
import { RBSSchein } from './rbs-schein/RBSSchein';
import { rbsScheinSchema } from './rbs-schein/schema';
import { RBSScheinFinanzierung } from './rbs-schein-finanzierung/RBSScheinFinanzierung';
import { rbsScheinFinanzierungSchema } from './rbs-schein-finanzierung/schema';
import { RBSScheinSonstige } from './rbs-schein-sonstige/RBSScheinSonstige';
import { rbsScheinSonstigeSchema } from './rbs-schein-sonstige/schema';
import { RBSScheinFullServiceImmobilie } from './rbs-schein-full-service-immobilie/RBSScheinFullServiceImmobilie';
import { rbsScheinFullServiceImmobilieSchema } from './rbs-schein-full-service-immobilie/schema';
import { RBSScheinDFKHome } from './rbs-schein-dfk-home/RBSScheinDFKHome';
import { rbsScheinDFKHomeSchema } from './rbs-schein-dfk-home/schema';
import { RBSScheinDFKSafe } from './rbs-schein-dfk-safe/RBSScheinDFKSafe';
import { rbsScheinDFKSafeSchema } from './rbs-schein-dfk-safe/schema';
import DocumentGuideContainer from '../document-guide/DocumentGuideContainer';
import InvestmentKompassGuide from './investment-kompass/guide/InvestmentKompassGuide';

/**
 * Add any document types here that have a guide
 */
export const hasGuide = [OnlineDocumentType.INVESTMENT_KOMPASS];

export type GetDocument = (
  documentType: OnlineDocumentType | undefined
) => { documentComponent: ReactNode; documentSchema: SpecifiedField[] | null };

const getDocSchemaAndComponent: GetDocument = (documentType) => {
  let documentComponent = null;
  let documentSchema: SpecifiedField[] | null = null;
  switch (documentType) {
    case OnlineDocumentType.INVESTMENT_KOMPASS:
      documentComponent = (
        <>
          <InvestmentKompassDoc />

          <DocumentGuideContainer>
            <InvestmentKompassGuide />
          </DocumentGuideContainer>
        </>
      );
      documentSchema = investmentKompassDocSchema;
      break;
    case OnlineDocumentType.EINMALANLAGE_ZEICHNUNGSSCHEIN:
      documentComponent = <EinmalanlageZeichnungsschein />;
      documentSchema = doc001Schema;
      break;
    case OnlineDocumentType.EINMALANLAGE_GELDWAESCHEGESETZ:
      documentComponent = <EinmalanlageGeldwaeschegesetz />;
      documentSchema = doc002Schema;
      break;
    case OnlineDocumentType.RATIERLICH_ZEICHNUNGSSCHEIN:
      documentComponent = <RatierlichZeichnungsschein />;
      documentSchema = doc004Schema;
      break;
    case OnlineDocumentType.RATIERLICH_GELDWAESCHEGESETZ:
      documentComponent = <RatierlichGeldwaeschegesetz />;
      documentSchema = doc003Schema;
      break;
    case OnlineDocumentType.ANGEBOT_IMMOSPAREN:
      documentComponent = <AngebotImmosparen />;
      documentSchema = angebotImmosparenDocSchema;
      break;

    // For development purposes only. Delete this once the UI for single edit is ready
    case OnlineDocumentType.RBS_SCHEIN:
      documentComponent = <RBSSchein />;
      documentSchema = rbsScheinSchema;
      break;
    case OnlineDocumentType.RBS_SCHEIN_FUNDING:
      documentComponent = <RBSScheinFinanzierung />;
      documentSchema = rbsScheinFinanzierungSchema;
      break;
    case OnlineDocumentType.RBS_SCHEIN_OTHER:
      documentComponent = <RBSScheinSonstige />;
      documentSchema = rbsScheinSonstigeSchema;
      break;
    case OnlineDocumentType.RBS_SCHEIN_FULLSERVICE:
      documentComponent = <RBSScheinFullServiceImmobilie />;
      documentSchema = rbsScheinFullServiceImmobilieSchema;
      break;
    case OnlineDocumentType.RBS_SCHEIN_DFK_HOME:
      documentComponent = <RBSScheinDFKHome />;
      documentSchema = rbsScheinDFKHomeSchema;
      break;
    case OnlineDocumentType.RBS_SCHEIN_DFK_SAFE:
      documentComponent = <RBSScheinDFKSafe />;
      documentSchema = rbsScheinDFKSafeSchema;
      break;
  }
  return {
    documentComponent,
    documentSchema,
  };
};

export default getDocSchemaAndComponent;
