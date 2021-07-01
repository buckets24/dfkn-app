import React, { FC } from 'react';
import { Divider } from '@chakra-ui/react';
import { SignatureFormikField, SignaturePrintField } from 'src/components/signature-field/SignatureField';
import { StringFieldType, StringFormikField, StringPrintField } from 'jexity-app/form/fields/StringField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { SignatureIcon } from 'jexity-app/icons/SignatureIcon';
import { PrintableText } from 'src/modules/documents/PrintableText';
import { PrintableHeading } from 'src/modules/documents/PrintableHeading';
import { PrintableField } from 'src/modules/documents/PrintableField';
import { PageWrapper } from '../../common/PageWrapper';
import { EinmalanlageZeichnungsscheinFooter } from '../EinmalanlageZeichnungsscheinFooter';

export const Page03: FC = () => {
  return (
    <PageWrapper mb={5} px={5} pt={5} className="no-page-break" footer={<EinmalanlageZeichnungsscheinFooter />}>
      <PrintableText mb={5}>
        (c) Personenbezogene Daten des Anlegers werden gelöscht, sobald sie für Erreichung des Zwecks ihrer Erhebung
        nicht mehr erforderlich sind. Auch nach Ende des Vertrages kann es erforderlich sein, die personenbezogenen
        Daten zu speichern, um vertraglichen, gesetzlichen, behördlichen und/oder regulatorischen Verpflichtungen
        nachzukommen.
      </PrintableText>
      <PrintableText mb={5}>
        (d) Der Anleger hat das Recht auf Auskunft seitens des jeweiligen Verantwortlichen (d.h. Deutsches Finanzkontor
        S.A. handelnd für das Compartment DFK 2020-1) über die betreffenden personenbezogenen Daten zu verlangen; dies
        betrifft auch die Empfänger oder Kategorien von Empfängern, an die diese Daten weitergegeben werden und den
        Zweck der Speicherung. Zudem hat der Anleger das unter den Voraussetzungen des Art. 16 DSGVO auf Berichtigung,
        nach Art. 17 DSGVO auf Löschung oder nach Art. 18 DSGVO auf Einschränkung der Verarbeitung oder eines
        Widerspruchsrechts gegen die Verarbeitung sowie nach Art. 20 DSGVO auf Datenübertragung.
      </PrintableText>
      <PrintableText mb={5}>
        (e) Der Anleger hat das Recht, die Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen, ohne dass
        die Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten Verarbeitung berührt wird. Das
        Widerrufsrecht erstreckt sich auf Verarbeitungen, die aufgrund von Artikel 6 Abs. 1(e) und (f) der
        EU-Datenschutzgrundverordnung erfolgen. Dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling.
      </PrintableText>
      <PrintableText mb={5}>
        (f) Der Anleger hat ein Beschwerderecht bei dem oder der Bundesbeauftragten für den Datenschutz und die
        Informationsfreiheit.
      </PrintableText>
      <PrintableText mb={5}>
        (g) Die personenbezogenen Daten des Anlegers werden erhoben, gespeichert, verarbeitet und ggf. an Unternehmen
        weitergegeben, soweit es erforderlich ist, um die vertragliche Leistung zu erbringen. Die vom Anleger
        abgefragten und bereitgestellten personenbezogenen Daten sind für den Vertragsabschluss sowie die –durchführung
        erforderlich. Die Nichtbereitstellung hat zur Folge, dass der Zeichnungs- und Begebungsvertrag nicht
        abgeschlossen werden und der Anleger keine Schuldverschreibungen von der Emittentin erwerben kann.
      </PrintableText>
      <PrintableText mb={5}>
        (h) Es besteht keine automatisierte Entscheidungsfindung einschließlich Profiling.
      </PrintableText>
      <PrintableHeading as="h4" fontWeight={700}>
        Ort und Modalität der Unterzeichnung
      </PrintableHeading>
      <PrintableText mb={5}>
        Dieser Zeichnungs- und Begebungsvertrag wurde in den folgenden Geschäftsräumen unterzeichnet:
      </PrintableText>
      <PrintableField<StringFieldType>
        EditComponent={StringFormikField}
        PrintComponent={StringPrintField}
        key="businessPremises"
        name="businessPremises"
        label="Geschäftsräumen unterzeichnet"
        variant="flushed"
        showRequiredIcon={false}
        isRequired
      />
      <PrintableHeading as="h4" my={5} fontWeight={700}>
        Widerrufsbelehrung
      </PrintableHeading>
      <PrintableText mb={5}>Widerrufsrecht</PrintableText>
      <PrintableText mb={5}>
        Sie können Ihre Vertragserklärung innerhalb von 14 Tagen ohne Angabe von Gründen mittels einer eindeutigen
        Erklärung widerrufen. Die Frist beginnt nach Erhalt dieser Belehrung auf einem dauerhaften Datenträger, jedoch
        nicht vor Vertragsschluss und auch nicht vor Erfüllung unserer Informationspflichten gemäß Artikel 246b § 2 Abs.
        1 in Verbindung mit Artikel 246b § 1 Abs. 1 EGBGB. Zur Wahrung der Widerrufsfrist genügt die rechtzeitige
        Absendung des Widerrufs, wenn die Erklärung auf einem dauerhaften Datenträger (z. B. Brief, Telefax, E-Mail)
        erfolgt.
      </PrintableText>
      <PrintableText mb={10}>
        Der Widerruf ist zu richten an: Deutsches Finanzkontor S.A., handelnd für das Compartment DFK 2020-1, 62, Avenue
        de la Liberté L-1930 Luxembourg, Großherzogtum Luxemburg, Telefonnr. +352 263778-1, Fax +352 263778-26, E-Mail:
        info@dfksa.com.
      </PrintableText>
      <PrintableText mb={5}>Widerrufsfolgen</PrintableText>
      <PrintableText mb={5}>
        Im Falle eines wirksamen Widerrufs sind die beiderseits empfangenen Leistungen zurückzugewähren. Sie sind zur
        Zahlung von Wertersatz für die bis zum Wider-ruf erbrachte Dienstleistung verpflichtet, wenn Sie vor Abgabe
        Ihrer Vertragserklärung auf diese Rechtsfolge hingewiesen wurden und ausdrücklich zugestimmt haben, dass wir vor
        dem Ende der Widerrufsfrist mit der Ausführung der Gegenleistung beginnen. Besteht eine Verpflichtung zur
        Zahlung von Wertersatz, kann dies dazu führen, dass Sie die vertraglichen Zahlungsverpflichtungen für den
        Zeitraum bis zum Widerruf dennoch erfüllen müssen. Ihr Widerrufsrecht erlischt vorzeitig, wenn der Vertrag von
        beiden Seiten auf Ihren ausdrücklichen Wunsch vollständig erfüllt ist, bevor Sie Ihr Widerrufsrecht ausgeübt
        haben. Verpflichtun-gen zur Erstattung von Zahlungen müssen innerhalb von 30 Tagen erfüllt werden. Die Frist
        beginnt für Sie mit der Absendung Ihrer Widerrufserklärung, für uns mit deren Empfang.
      </PrintableText>
      <FormGridLayout
        mt={10}
        columns={2}
        spacingX={5}
        fields={[
          <PrintableField<StringFieldType>
            EditComponent={StringFormikField}
            PrintComponent={StringPrintField}
            key="rightOfWithdrawalPlaceAndDate"
            name="rightOfWithdrawalPlaceAndDate"
            label="Ort, Datum"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
          <PrintableField<StringFieldType>
            type="signatureFormField"
            EditComponent={SignatureFormikField}
            PrintComponent={SignaturePrintField}
            variant="flushed"
            key="rightOfWithdrawalDraftsmanSignature"
            name="rightOfWithdrawalDraftsmanSignature"
            label="Unterschrift Zeichner"
            showRequiredIcon={false}
            rightIcon={<SignatureIcon mt={3} />}
            isRequired
          />,
        ]}
      />
      <PrintableText>Anlage: Erklärung zum Geldwäschegesetz</PrintableText>
      <Divider my={3} borderColor="#E4E7EB" />
      <PrintableHeading as="h4" my={5} fontWeight={700}>
        Zeichnung angenommen:
      </PrintableHeading>
      <PrintableText>Deutsches Finanzkontor S.A., Compartment DFK 2020-1</PrintableText>
      <PrintableText>vertreten durch die</PrintableText>
      <PrintableText>DFK Platzierungsmanagement GmbH </PrintableText>
      <FormGridLayout
        mt={3}
        mb={5}
        columns={2}
        spacingX={5}
        fields={[
          <PrintableField<StringFieldType>
            EditComponent={StringFormikField}
            PrintComponent={StringPrintField}
            key="drawingAcceptedPlaceAndDate"
            name="drawingAcceptedPlaceAndDate"
            label="Ort, Datum"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
          <PrintableField<StringFieldType>
            type="signatureFormField"
            EditComponent={SignatureFormikField}
            PrintComponent={SignaturePrintField}
            variant="flushed"
            key="drawingAcceptedManagingDirectorSignature"
            name="drawingAcceptedManagingDirectorSignature"
            label="Unterschrift Geschäftsführer DFK Platzierungsmanagement GmbH"
            showRequiredIcon={false}
            rightIcon={<SignatureIcon mt={3} />}
            isRequired
          />,
        ]}
      />
    </PageWrapper>
  );
};
