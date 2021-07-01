import React, { FC } from 'react';
import { GuideText, GuideWrapper } from 'src/modules/documents/document-guide/GuideBaseComponents';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { InvestmentKompassGuideProps } from './InvestmentKompassGuideApi';

const Seite8Frage6Teil2: FC<InvestmentKompassGuideProps> = ({ name }) => {
  const isActive = useDocumentGuidePosition((state) => state.currentActive) === name;

  return (
    <GuideWrapper name={name} highlight={isActive}>
      <GuideText>
        Die meisten Finanzierungen werden über einen langen Zeitraum berechnet, da dies die monatliche Belastung niedrig
        hält. Wenn Sie allerdings die Möglichkeit hätten, früher mit der Finanzierung fertig zu sein, wäre dies für Sie
        interessant?
      </GuideText>
    </GuideWrapper>
  );
};

export default Seite8Frage6Teil2;
