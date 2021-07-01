import React, { FC } from 'react';
import { GuideText, GuideWrapper } from 'src/modules/documents/document-guide/GuideBaseComponents';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { InvestmentKompassGuideProps } from './InvestmentKompassGuideApi';

const Seite3Teil1: FC<InvestmentKompassGuideProps> = ({ name }) => {
  const isActive = useDocumentGuidePosition((state) => state.currentActive) === name;

  return (
    <GuideWrapper name={name} highlight={isActive}>
      <GuideText>
        Bevor wir aber in die Finanzanalyse starten, lassen Sie uns zunächst gemeinsam die Herausforderung betrachten.
      </GuideText>
      <GuideText>Zumindest in finanzieller Hinsicht können wir unser Leben in drei Bereiche einteilen.</GuideText>
      <GuideText>
        1. Der erste Abschnitt begann mit Ihrer Geburt und ich bezeichne ihn gerne als Lernphase. Sie lernten Laufen und
        Sprechen, Sie lernten vielleicht im Kindergarten und in der Schule, usw.
      </GuideText>
      <GuideText>
        2. Der zweite Abschnitt ist dann geprägt vom Arbeiten und Geld verdienen. Hierbei sind Sie mit einem gewissen
        Gehalt ins Berufsleben eingestiegen und es entwickelte sich mit gewissen Schwankungen nach oben.
      </GuideText>
      <GuideText>
        3. Irgendwann endet dann Ihr Arbeitsleben und es beginnt der dritte Abschnitt, nennen wir ihn einfach einmal
        Freizeit. Das Problem an der Freizeit ist nur, dass zu diesem Zeitpunkt Ihr Einkommen auf Ihr persönliches
        Rentenniveau abfällt. Das beträgt in der Regel nur ca. 50% Ihres Einkommens.
      </GuideText>
      <GuideText>
        Aber lassen Sie uns doch kurz einmal ausrechnen, wie hoch Ihre Rentenlücke voraussichtlich sein wird.
      </GuideText>
      <GuideText>
        Vielleicht kommt bei Ihnen noch eine Rente aus einer privaten oder betrieblichen Altersvorsorge hinzu, trotzdem
        wird aber eine Lücke bestehen bleiben. Um diese zu schließen, müssen Sie heute anfangen zu sparen, um sich das
        notwendige Kapital aufzubauen.
      </GuideText>
    </GuideWrapper>
  );
};

export default Seite3Teil1;
