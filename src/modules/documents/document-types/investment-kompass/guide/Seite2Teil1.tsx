import React, { FC } from 'react';
import { GuideHeading, GuideText, GuideWrapper } from 'src/modules/documents/document-guide/GuideBaseComponents';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { InvestmentKompassGuideProps } from './InvestmentKompassGuideApi';

const Seite2Teil1: FC<InvestmentKompassGuideProps> = ({ name }) => {
  const isActive = useDocumentGuidePosition((state) => state.currentActive) === name;

  return (
    <GuideWrapper name={name} highlight={isActive}>
      <GuideHeading>WIE FUNKTIONIERT DER INVESTMENT-KOMPASS?</GuideHeading>
      <GuideText>
        1. Im ersten Schritt werden wir uns mit Ihrer aktuellen, finanziellen Situation beschäftigen, wir nennen es die
        Finanzanalyse.
      </GuideText>
      <GuideText>
        2. Der zweite Schritt ist dann die Finanzoptimierung. Hierbei geht es darum, notwendige Kosten zu reduzieren und
        unnötige Kosten zu vermeiden.
      </GuideText>
      <GuideText>
        3. Und im dritten Schritt beschäftigen wir uns dann gemeinsam mit Ihrer Vermögensbildung, das heißt, wie können
        Sie das freigewordene Kapital sicher und gewinnbringend investieren.
      </GuideText>
    </GuideWrapper>
  );
};

export default Seite2Teil1;
