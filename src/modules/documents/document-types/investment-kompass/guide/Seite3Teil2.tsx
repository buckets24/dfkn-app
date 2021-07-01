import React, { FC } from 'react';
import { GuideText, GuideWrapper } from 'src/modules/documents/document-guide/GuideBaseComponents';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { InvestmentKompassGuideProps } from './InvestmentKompassGuideApi';

const Seite3Teil2: FC<InvestmentKompassGuideProps> = ({ name }) => {
  const isActive = useDocumentGuidePosition((state) => state.currentActive) === name;

  return (
    <GuideWrapper name={name} highlight={isActive}>
      <GuideText>
        Hinzu kommt, dass Sie heute sicherlich einen Großteil Ihrer Zeit mit Arbeit verbringen, um Einkommen zu
        generieren und es bleibt nur wenig Freizeit übrig.
      </GuideText>
      <GuideText>Dieses Verhältnis möchten wir mit Ihnen gemeinsam ändern.</GuideText>
      <GuideText>
        Ziel ist es hierbei, für Sie und Ihre Familie zunächst weitere Einnahmequellen zu generieren, wir nennen dies
        passives Einkommen, damit Sie zukünftig weniger oder gar nicht mehr arbeiten müssen und deutlich mehr Zeit für
        Dinge haben, die Ihnen und Ihrer Familie Spaß machen.
      </GuideText>
    </GuideWrapper>
  );
};

export default Seite3Teil2;
