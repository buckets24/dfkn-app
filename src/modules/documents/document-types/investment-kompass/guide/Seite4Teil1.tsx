import React, { FC } from 'react';
import { GuideEmphasis, GuideText, GuideWrapper } from 'src/modules/documents/document-guide/GuideBaseComponents';
import useDocumentGuidePosition from 'src/modules/documents/document-guide/useDocumentGuidePosition';
import { InvestmentKompassGuideProps } from './InvestmentKompassGuideApi';

const Seite4Teil1: FC<InvestmentKompassGuideProps> = ({ name }) => {
  const isActive = useDocumentGuidePosition((state) => state.currentActive) === name;

  return (
    <GuideWrapper name={name} highlight={isActive}>
      <GuideText>
        Und da sind wir schon bei den Dingen, die Ihnen Spaß machen, Ihren persönlichen Zielen und Wünschen.
      </GuideText>
      <GuideText>Wir haben hier die meistgenannten Ziele aufgeführt.</GuideText>
      <GuideText>
        Ich möchte Sie nun bitten, nach Ihrer Priorität auszuwählen, damit wir die Gestaltung des Budgets exakt auf die
        Erreichung Ihrer Ziele und Wünsche ausrichten können.
      </GuideText>
      <GuideText>
        <GuideEmphasis>1. Eigene Immobilie</GuideEmphasis>
        <br /> Hier geht es um den Wunsch, eine eigene Immobilie zu besitzen, ob als Eigenheim (Haus oder
        Eigentumswohnung) oder als zusätzliche Kapitalanlage.
      </GuideText>
      <GuideText>
        <GuideEmphasis>2. Sichere Zukunft für den Nachwuchs</GuideEmphasis>
        <br /> Das bedeutet, Kapital für die Förderung des Nachwuchses, wie z. B. die musikalische Erziehung, sportliche
        Aktivitäten, Nachhilfeunterricht, Reitunterricht sowie die Hochschulausbildung oder den Führerschein aufzubauen.
        Aber auch das Thema vererben spielt hier eine wichtige Rolle. Was passiert, wenn Sie als Erziehungsberechtigten
        plötzlich von ihrem Recht auf Ableben Gebrauch machen?
      </GuideText>
      <GuideText>
        <GuideEmphasis>3. Finanzielle Unabhängigkeit</GuideEmphasis>
        <br /> Unsere Idee der finanziellen Unabhängigkeit besteht darin, soviel Vermögen zu besitzen, dass Sie in der
        Lage sind, vom passiven Einkommen gut leben zu können, also nicht von Ihrem Beruf abhängig sind.
      </GuideText>
      <GuideText>
        <GuideEmphasis>4. Ruhestand absichern</GuideEmphasis>
        <br /> Bei der Absicherung des Ruhestands geht es darum, sich im Alter keine Sorgen ums Geld machen zu müssen.
        Das reine Vertrauen auf die gesetzliche Absicherung reicht mit Sicherheit nicht mehr aus. Hier muss man
        eigenständig eine Zusatzversorgung aufbauen, wo sogar der Staat selbst in seinen jährlichen Rentenbescheiden
        deutlich drauf hinweist.
      </GuideText>
      <GuideText>
        <GuideEmphasis>5. Optimale Existenzsicherheit</GuideEmphasis>
        <br /> Die meisten Menschen denken oft nur an die Absicherung der Vermögensgegenstände. Die Absicherung der
        eigenen Arbeitskraft bzw. der Arbeitskraft von Familienangehörigen wird hierbei oft vernachlässigt. Dabei kann
        gerade die Erkrankung eines Familienmitgliedes zu immensen Geldsorgen führen.
      </GuideText>
      <GuideText>
        <GuideEmphasis>6. Sonstige Wünsche</GuideEmphasis>
        <br /> Haben wir einen für Sie ebenfalls wichtigen Punkt vergessen?
      </GuideText>
    </GuideWrapper>
  );
};

export default Seite4Teil1;
