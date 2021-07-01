import { SimpleGrid } from '@chakra-ui/react';
import React, { FC } from 'react';
import { GuideEmphasis, GuideText, GuideWrapper } from 'src/modules/documents/document-guide/GuideBaseComponents';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { InvestmentKompassGuideProps } from './InvestmentKompassGuideApi';

const Seite6Teil1: FC<InvestmentKompassGuideProps> = ({ name }) => {
  const isActive = useDocumentGuidePosition((state) => state.currentActive) === name;

  return (
    <GuideWrapper name={name} highlight={isActive}>
      <GuideText>
        Für eine Finanzoptimierung sollten Sie Ihre Einnahmen und Ausgaben voneinander trennen. Das klingt banal. Wird
        aber leider oft vergessen.
      </GuideText>
      <GuideText>
        <GuideEmphasis>Fragen</GuideEmphasis>
        <br /> „Wie ist das bei Ihnen geregelt. Sie verfügen doch sicherlich über ein Konto, auf welches Ihre laufenden
        Einnahmen fließen. Ist das bei Ihnen auch das Konto, von welchem alle Ausgaben abgehen”?
      </GuideText>
      <SimpleGrid templateColumns="1fr 1fr" gridGap={20}>
        <GuideText>
          <GuideEmphasis>Ja:</GuideEmphasis>
          <br />
          Dies trifft man leider noch sehr häufig an. Und oft beklagen sich die Menschen dann über eine gewisse
          Unübersichtlichkeit.
        </GuideText>
        <GuideText>
          <GuideEmphasis>Nein:</GuideEmphasis>
          <br />
          Sehr gut! Dann sind Sie den meisten Bundesbürgern schon einen weiten Schritt voraus. Darf ich Sie kurz fragen,
          wie Sie Ihre Konten- Struktur aufgebaut haben?
        </GuideText>
      </SimpleGrid>
      <GuideText>
        Wir empfehlen unseren Kunden das „3-Konten-Modell“. Hierdurch wird Ihre Vermögensbildung deutlich vereinfacht
        und Sie kommen deutlich zügiger an Ihr Ziel. Und das Gute ist, Sie können Ihr vorhandenes Konto ideal in die
        neue Kontostruktur einbinden und es in bestehender Form belassen.
      </GuideText>
      <GuideText>Zusätzlich empfehlen wir Ihnen, noch drei weitere Konten zu eröffnen.</GuideText>
      <GuideText>
        <GuideEmphasis>1. Das Sparkonto:</GuideEmphasis>
        <br />
        Auf dieses Konto fließen nun mtl. 20% aller Ihrer Einnahmen, um diese kurzfristig, mittel- und langfristig
        anzulegen.
      </GuideText>
      <GuideText>
        <GuideEmphasis>2. Das Konto für fixe Ausgaben:</GuideEmphasis>
        <br />
        Kosten wie Miete, Nebenkosten, Strom usw. laufen jeden Monat in gleicher Höhe an und werden ausschließlich von
        diesem Konto bedient, welches mit etwa 50% Ihrer Einnahmen bespart wird.
      </GuideText>
      <GuideText>
        <GuideEmphasis>3. Das Konto für flexible Ausgaben:</GuideEmphasis>
        <br />
        Alles, was nun noch zur Verfügung steht, also etwa 30% Ihrer Einnahmen, können Sie „verleben“.
      </GuideText>
    </GuideWrapper>
  );
};

export default Seite6Teil1;
