import React, { FC } from 'react';
import { GuideText, GuideWrapper } from 'src/modules/documents/document-guide/GuideBaseComponents';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { InvestmentKompassGuideProps } from './InvestmentKompassGuideApi';

const Seite6Teil2: FC<InvestmentKompassGuideProps> = ({ name }) => {
  const isActive = useDocumentGuidePosition((state) => state.currentActive) === name;

  return (
    <GuideWrapper name={name} highlight={isActive}>
      <GuideText>Lassen Sie uns doch einmal zusammenfassen, was das in Zahlen für Sie bedeuten würde.</GuideText>
      <GuideText>
        Hier jetzt die persönlichen Daten des Kunden aufnehmen. Zeit lassen, damit es so vollständig wie möglich ist.
      </GuideText>
      <GuideText>
        Um Ihre, persönlich auf Sie zugeschnittene, Finanzoptimierung durchführen zu können, benötige ich noch ein paar
        wichtige Informationen von Ihnen.
      </GuideText>
      <GuideText>Generell gilt: je detaillierter die Informationen sind, um so besser!</GuideText>
      <GuideText>Aber: Sollte der Kunde keine Informationen geben wollen, dann zu nächsten Frage wechseln.</GuideText>
    </GuideWrapper>
  );
};

export default Seite6Teil2;
