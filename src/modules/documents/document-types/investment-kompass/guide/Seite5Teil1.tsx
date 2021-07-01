import React, { FC } from 'react';
import { GuideEmphasis, GuideText, GuideWrapper } from 'src/modules/documents/document-guide/GuideBaseComponents';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { InvestmentKompassGuideProps } from './InvestmentKompassGuideApi';

const Seite5Teil1: FC<InvestmentKompassGuideProps> = ({ name }) => {
  const isActive = useDocumentGuidePosition((state) => state.currentActive) === name;

  return (
    <GuideWrapper name={name} highlight={isActive}>
      <GuideText>
        Hinzu kommt, dass die meisten Menschen denken, dass sie sich eine oder mehrere Immobilien nicht leisten können.
        Wir haben hier deshalb zwei Beispiele aufgeführt, wie ein sinnvoller und strukturierter Vermögensaufbau aussehen
        könnte. Und das schon mit kleinen monatlichen Investitionen.
      </GuideText>
      <GuideText>
        <GuideEmphasis>Beispiel 1:</GuideEmphasis>
        <br /> Martin hat ein etwas geringeres Budget zur Verfügung. Dadurch, dass sein Mieter den größten Teil der
        Kosten trägt, kauft er sich seine erste Immobilie. In den nächsten 30 Jahren baut er sich ein zusätzliches
        Vermögen (z. B. 175.702 €) oder eine zusätzliche Rente (Mieteinnahme 512,-- €) auf.
      </GuideText>
      <GuideText>
        <GuideEmphasis>Beispiel 2:</GuideEmphasis>
        <br /> Familie Siewert hat ein etwas höheres Budget. Zusätzlich zu ihrer ersten Wohnung investieren Sie weitere
        150,-- € in das Immo-Sparen-Konzept. Hierdurch bauen sie sich zusätzliches Kapital auf, um sich alle 5 Jahre
        eine weitere Immobilie anschaffen zu können. In den nächsten 30 Jahren erwirtschaften sie somit ein zusätzliches
        Vermögen (755.234 €) oder eine Zusatzrente (2.346 €) aus den Mieteinnahmen. Und auch hier wird der deutlich
        höhere Anteil von den Mietern getragen.
      </GuideText>
      <GuideText>
        Es ist aber wichtig, wie übrigens bei nahezu allen Investitionen, dass Sie Ihre Strategie, aber auch die
        möglichen Risiken, die es auf dem Immobilienmarkt gibt, kennen.
      </GuideText>
    </GuideWrapper>
  );
};

export default Seite5Teil1;
