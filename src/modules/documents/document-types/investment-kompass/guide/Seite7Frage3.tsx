import React, { FC } from 'react';
import { GuideText, GuideWrapper } from 'src/modules/documents/document-guide/GuideBaseComponents';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { InvestmentKompassGuideProps } from './InvestmentKompassGuideApi';

const Seite7Frage3: FC<InvestmentKompassGuideProps> = ({ name }) => {
  const isActive = useDocumentGuidePosition((state) => state.currentActive) === name;

  return (
    <GuideWrapper name={name} highlight={isActive}>
      <GuideText>Der Staat gewährt einige Förderungen, sinnvolle und auch nicht ganz so sinnvolle.</GuideText>
      <GuideText>Wünschen Sie hierzu eine Beratung, welche Förderungen für Sie interessant sein könnten?</GuideText>
      <GuideText>Nutzen Sie denn bereits die ein oder andere Förderung?</GuideText>
    </GuideWrapper>
  );
};

export default Seite7Frage3;
