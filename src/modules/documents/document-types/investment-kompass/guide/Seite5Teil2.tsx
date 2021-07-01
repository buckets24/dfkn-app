import { List, ListItem, UnorderedList } from '@chakra-ui/layout';
import React, { FC } from 'react';
import { GuideText, GuideWrapper } from 'src/modules/documents/document-guide/GuideBaseComponents';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { InvestmentKompassGuideProps } from './InvestmentKompassGuideApi';

const Seite5Teil2: FC<InvestmentKompassGuideProps> = ({ name }) => {
  const isActive = useDocumentGuidePosition((state) => state.currentActive) === name;

  return (
    <GuideWrapper name={name} highlight={isActive}>
      <GuideText>
        Nachdem wir uns nun Ihre Wünsche und Ziele angesehen haben, wollen wir uns damit beschäftigen, wie Sie Ihr
        hierfür notwendiges Vermögen aufbauen können.
      </GuideText>
      <GuideText>
        Die meisten Menschen konzentrieren sich beim Vermögensaufbau vor allem auf das „Geld verdienen“. Leider bleiben
        sie genau deswegen unter ihren finanziellen Möglichkeiten.
      </GuideText>
      <GuideText>
        Die Menschen
        <UnorderedList>
          <ListItem>arbeiten immer mehr,</ListItem>
          <ListItem>um mehr Einnahmen zu erzielen,,</ListItem>
          <ListItem>um Vermögen aufzubauen,</ListItem>
          <ListItem>um sich ihre Wünsche und Ziele erfüllen zu können.</ListItem>
        </UnorderedList>
      </GuideText>
      <GuideText>
        Doch genau deshalb fehlt ihnen oft die Zeit, sich um ihr hart verdientes Geld zu kümmern. Im Zweifel bleibt das
        Geld einfach „ohne“ Verzinsung auf dem Girokonto oder auf einem Tagesgeldkonto mit einer Verzinsung unterhalb
        der Inflationsrate liegen.
      </GuideText>
      <GuideText>Genau hier möchten wir mit Ihnen zusammen den Hebel ansetzen.</GuideText>
      <GuideText>
        Die bundesdeutschen Haushalte sparen durchschnittlich ca. 20% ihres Nettoeinkommens. Wichtig ist aber, dass
        nicht alles auf eine Karte gesetzt wird.
      </GuideText>
      <GuideText>
        Wir empfehlen unseren Mandanten, die Hälfte des Budgets, somit ca. 10%, als Liquiditätsreserve anzulegen.
      </GuideText>
      <GuideText>
        Die Liquiditätsreserve kann über das Sparbuch oder Tagesgeldkonto aufgebaut werden. Es sind Ersparnisse für z.
        B. den Urlaub oder für unvorhersehbare Dinge.
      </GuideText>
      <GuideText>
        Von dem dann noch verbleibenden Budget empfehlen wir 5% in mittelfristige, wir sprechen hier von einem
        Zeithorizont von 3-5 Jahren und 5% in langfristige Investments mit einem Anlagehorizont von 10 Jahren und mehr
        anzulegen.
      </GuideText>
      <GuideText>Hierbei sollte aber immer das Thema „Sicherheit“ an oberster Stelle stehen.</GuideText>
    </GuideWrapper>
  );
};

export default Seite5Teil2;
