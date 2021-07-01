import React, { FC } from 'react';
import { GuideText, GuideWrapper } from 'src/modules/documents/document-guide/GuideBaseComponents';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { InvestmentKompassGuideProps } from './InvestmentKompassGuideApi';

const Seite8Frage5: FC<InvestmentKompassGuideProps> = ({ name }) => {
  const isActive = useDocumentGuidePosition((state) => state.currentActive) === name;

  return (
    <GuideWrapper name={name} highlight={isActive}>
      <GuideText>
        Leider vergessen viele Menschen, wie wichtig die eigene Arbeitskraft ist. Sollte der Ernährer der Familie seinen
        Beruf nicht mehr ausüben können, so kommt ggfs. das gesamte Vorsorgekonstrukt ins Schwanken. Dabei könnte man
        auch hierfür eine Absicherung vorsehen.
      </GuideText>
    </GuideWrapper>
  );
};

export default Seite8Frage5;
