import React, { FC } from 'react';
import { GuideText, GuideWrapper } from 'src/modules/documents/document-guide/GuideBaseComponents';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { InvestmentKompassGuideProps } from './InvestmentKompassGuideApi';

const Seite8Frage6Teil1: FC<InvestmentKompassGuideProps> = ({ name }) => {
  const isActive = useDocumentGuidePosition((state) => state.currentActive) === name;

  return (
    <GuideWrapper name={name} highlight={isActive}>
      <GuideText>
        Nun hätte ich noch ein paar Fragen zum Thema Immobilie. Jeder der zur Miete wohnt, zahlt im Laufe seines Lebens
        die Immobilie für eine andere Person ab.Wäre es da nicht besser, man zahlt statt einer Fremd-Miete lieber seine
        eigene Immobilie ab und baut sich somit zeitgleich Vermögen auf.
      </GuideText>
    </GuideWrapper>
  );
};

export default Seite8Frage6Teil1;
