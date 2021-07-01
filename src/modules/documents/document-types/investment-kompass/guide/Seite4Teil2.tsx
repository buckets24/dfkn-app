import React, { FC } from 'react';
import { GuideText, GuideWrapper } from 'src/modules/documents/document-guide/GuideBaseComponents';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { InvestmentKompassGuideProps } from './InvestmentKompassGuideApi';

const Seite4Teil2: FC<InvestmentKompassGuideProps> = ({ name }) => {
  const isActive = useDocumentGuidePosition((state) => state.currentActive) === name;

  return (
    <GuideWrapper name={name} highlight={isActive}>
      <GuideText>
        Um diese Ziele zu erreichen, benötigen wir häufig Zeit und Kapital. Eine Herausforderung, der wir immer wieder
        gegenüberstehen ist folgende:
      </GuideText>
      <GuideText>
        <strong>Junge Menschen</strong> haben noch viel Zeit um sich ihr Vermögen aufzubauen, verfügen aber häufig über
        wenig Kapital, welches investiert werden könnte.
      </GuideText>
      <GuideText>
        <strong>Ältere Menschen</strong> hingegen haben weniger Zeit, haben allerdings häufig schon Kapital gebildet,
        welches zur Investition zu Verfügung steht.
      </GuideText>
    </GuideWrapper>
  );
};

export default Seite4Teil2;
