import React, { FC } from 'react';
import { GuideText, GuideWrapper } from 'src/modules/documents/document-guide/GuideBaseComponents';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { InvestmentKompassGuideProps } from './InvestmentKompassGuideApi';

const Seite7Frage1: FC<InvestmentKompassGuideProps> = ({ name }) => {
  const isActive = useDocumentGuidePosition((state) => state.currentActive) === name;

  return (
    <GuideWrapper name={name} highlight={isActive}>
      <GuideText>War es ein Verkäufer, der nur eine einzige Gesellschaft vertritt?</GuideText>
      <GuideText>Wenn ja, welche?</GuideText>
      <GuideText>Was war sein Angebot?</GuideText>
      <GuideText>Mit welchen Geldanlagen hatte der Interessent Erfahrungen gemacht?</GuideText>
      <GuideText>In welchem Jahr?</GuideText>
      <GuideText>Wie ist seine Meinung dazu?</GuideText>
    </GuideWrapper>
  );
};

export default Seite7Frage1;
