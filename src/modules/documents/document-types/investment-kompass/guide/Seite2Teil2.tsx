import React, { FC } from 'react';
import { GuideText, GuideWrapper } from 'src/modules/documents/document-guide/GuideBaseComponents';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { InvestmentKompassGuideProps } from './InvestmentKompassGuideApi';

const Seite2Teil2: FC<InvestmentKompassGuideProps> = ({ name }) => {
  const isActive = useDocumentGuidePosition((state) => state.currentActive) === name;

  return (
    <GuideWrapper name={name} highlight={isActive}>
      <GuideText>
        An dieser Stelle möchte ich mich aber zunächst für Ihr Vertrauen bedanken, das Sie uns schenken. Und um diesem
        gerecht zu werden, lassen Sie mich kurz ein paar Eckdaten zu unserem Unternehmensverbund darstellen.
      </GuideText>
      <GuideText>
        Die Unternehmensgruppe wurde 2001 gegründet und ist seitdem stetig gewachsen. Heute betreuen über 500
        Mitarbeiterinnen und Mitarbeiter mehr als 40.000 zufriedene Familien.
      </GuideText>
      <GuideText>Unsere konzerneigenen Bauunternehmen errichten jedes Jahr zwischen 300 und 500 Wohnungen.</GuideText>
      <GuideText>
        Diese bieten wir unseren Kunden ohne zusätzliche Maklerprovisionen, dafür aber mit gesicherten Mieteinnahmen,
        als Kapitalanlage-Immobilien an.
      </GuideText>
      <GuideText>
        Da eine Kapitalanlage-Immobilie aber Rendite und keine Kopfschmerzen bringen soll, kümmert sich unsere eigene
        Mietverwaltungsgesellschaft um die Rundum-Sorglos- Verwaltung für unsere Kunden.
      </GuideText>
      <GuideText>
        Und um zu prüfen, ob und wie auch Sie von diesem Konzept profitieren können, sitzen wir heute hier zusammen.
      </GuideText>
    </GuideWrapper>
  );
};

export default Seite2Teil2;
