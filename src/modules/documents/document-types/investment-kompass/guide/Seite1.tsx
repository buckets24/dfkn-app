import React, { FC, useEffect } from 'react';
import { ContractorType } from 'src/API';
import { formatSalutation } from 'src/modules/common/utils';
import { GuideEmphasis, GuideText, GuideWrapper } from 'src/modules/documents/document-guide/GuideBaseComponents';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { requestDocumentWithPatchesById } from 'src/modules/documents/documentService';
import useDocumentByIdQuery from 'src/modules/documents/query-hooks/useDocumentByIdQuery';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { PromiseValue } from 'type-fest';
import { InvestmentKompassGuideProps } from './InvestmentKompassGuideApi';

const Seite1: FC<InvestmentKompassGuideProps> = ({ name }) => {
  const { activeDocumentId } = useDocFormMeta();

  const documentQuery = useDocumentByIdQuery(activeDocumentId, { enabled: false });
  const document = documentQuery.data;

  let client:
    | NonNullable<PromiseValue<ReturnType<typeof requestDocumentWithPatchesById>>>['client']
    | NonNullable<NonNullable<PromiseValue<ReturnType<typeof requestDocumentWithPatchesById>>>['client']>['contractor']
    | null = null;
  let clientName = ``;

  if (document) {
    if (document.contractor === ContractorType.SECONDARY) {
      if (document.client.contractor) {
        client = document.client.contractor;
      }
    } else {
      client = document.client;
    }
    clientName = formatSalutation(client);
  }
  const isActive = useDocumentGuidePosition((state) => state.currentActive) === name;
  const setCurrentActive = useDocumentGuidePosition((state) => state.setCurrentActive);

  useEffect(() => {
    setCurrentActive(name);
  }, []);

  return (
    <GuideWrapper name={name} highlight={isActive}>
      <GuideEmphasis>{clientName},</GuideEmphasis>
      <GuideText>
        jeder von uns wünscht sich doch eine &quot;sorgenfreie&quot; Zukunft. Dies setzt aber voraus, dass ich nicht nur
        ein Ziel habe, sondern auch einen Plan, wie ich dieses Ziel erreichen kann.
      </GuideText>
      <GuideText>
        Mit dem Investment-Kompass erstellen wir Ihnen Ihren persönlichen Fahrplan in Ihre finanziell sorgenfreie
        Zukunft.
      </GuideText>
      <GuideText>Hierbei liegt ein besonderer Fokus auf dem Bereich der intelligenten Immobilienlösungen.</GuideText>
      <GuideText>
        Dazu zählt das Eigenheim genauso wie die Kapitalanlage, aber auch das „direkte“ sowie das „indirekte“
        Investment.
      </GuideText>
    </GuideWrapper>
  );
};

export default Seite1;
