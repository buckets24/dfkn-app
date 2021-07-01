import React, { FC } from 'react';
import { GuideText, GuideWrapper } from 'src/modules/documents/document-guide/GuideBaseComponents';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { InvestmentKompassGuideProps } from './InvestmentKompassGuideApi';

const Seite7Frage2: FC<InvestmentKompassGuideProps> = ({ name }) => {
  const isActive = useDocumentGuidePosition((state) => state.currentActive) === name;

  return (
    <GuideWrapper name={name} highlight={isActive}>
      <GuideText>
        Bei der Auswahl der Produkte legen wir hohen Wert auf ein ausgewogenes Verhältnis zwischen Rentabilität,
        Liquidität und Sicherheit. Man spricht in der Wirtschaft von dem magischen Renditedreieck.
      </GuideText>
      <GuideText>
        Sobald Sie sich mehr zu einem der drei Punkte hinbewege, entfernen Sie sich automatisch von einem der anderen
        Punkte
      </GuideText>
      <GuideText>Wo würden Sie sich in diesem Renditedreieck eingruppieren?</GuideText>
    </GuideWrapper>
  );
};

export default Seite7Frage2;
