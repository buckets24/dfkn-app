import React, { FC } from 'react';
import { GuideText, GuideWrapper } from 'src/modules/documents/document-guide/GuideBaseComponents';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { InvestmentKompassGuideProps } from './InvestmentKompassGuideApi';

const Seite7Frage4: FC<InvestmentKompassGuideProps> = ({ name }) => {
  const isActive = useDocumentGuidePosition((state) => state.currentActive) === name;

  return (
    <GuideWrapper name={name} highlight={isActive}>
      <GuideText>
        Durch eine intelligente Anlage des staatlichen Kindergeldes besteht die Möglichkeit, Ihrem Kind zum 25.
        Geburtstag einen Betrag von 120.000,-- € zu schenken. Und das nahezu risikolos und ohne selbst etwas dazu zu
        bezahlen!
      </GuideText>
      <GuideText>Nutzen Sie diese Möglichkeit bereits oder möchten darüber informiert werden?</GuideText>
      <GuideText>
        Und wie sieht es mit der Absicherung Ihrer Kinder aus? Hierbei geht es nicht alleine um die
        Vermögensabsicherung, sondern auch um das Thema Krankheit, Unfall oder Berufsunfähigkeit.
      </GuideText>
      <GuideText>Wünschen Sie hierzu eine Beratung?</GuideText>
    </GuideWrapper>
  );
};

export default Seite7Frage4;
