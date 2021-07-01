/* eslint-disable react/no-unescaped-entities */
import React, { FC } from 'react';
import { Box, Divider } from '@chakra-ui/react';
import { StringFieldType, StringFormikField, StringPrintField } from 'jexity-app/form/fields/StringField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { RadioFieldType, RadioFormikField, RadioPrintField } from 'jexity-app/form/fields/RadioField';
import { SignatureFormikField, SignaturePrintField } from 'src/components/signature-field/SignatureField';
import { SignatureIcon } from 'jexity-app/icons/SignatureIcon';
import { PrintableText } from 'src/modules/documents/PrintableText';
import { PrintableField } from 'src/modules/documents/PrintableField';
import { PrintableHeading } from 'src/modules/documents/PrintableHeading';
import { PageWrapper } from '../../common/PageWrapper';
import { EinmalanlageZeichnungsscheinFooter } from '../EinmalanlageZeichnungsscheinFooter';
import { CurrencyFieldType, CurrencyFormikField } from 'jexity-app/form/fields/CurrencyField';
import { FlushedCurrencyPrintField } from '../../common/FlushedCurrencyPrintField';

export const Page02: FC = () => {
  return (
    <PageWrapper px={5} pt={5} className="no-page-break" footer={<EinmalanlageZeichnungsscheinFooter />}>
      <Box mb={5}>
        <PrintableHeading as="h3" fontWeight={700} textAlign="center" textDecor="underline">
          Gezeichnete Order-Teilschuldverschreibungen der ISIN LU2169803108
        </PrintableHeading>
      </Box>
      <PrintableField<StringFieldType>
        EditComponent={StringFormikField}
        PrintComponent={StringPrintField}
        key="bondsNumber"
        name="bondsNumber"
        label="Anzahl"
        variant="flushed"
        showRequiredIcon={false}
        helperText="(Mindestanzahl: 50 Schuldverschreibungen zu je 10,00 Euro)"
        isRequired
      />
      <FormGridLayout
        mt={5}
        mb={5}
        columns={2}
        spacingX={5}
        fields={[
          <PrintableField<CurrencyFieldType>
            EditComponent={CurrencyFormikField}
            PrintComponent={FlushedCurrencyPrintField}
            key="euroBonds"
            name="euroBonds"
            label="Euro"
            variant="flushed"
            showRequiredIcon={false}
            helperText="(Mindestens 500 Euro)"
            isRequired
          />,
          <PrintableField<StringFieldType>
            EditComponent={StringFormikField}
            PrintComponent={StringPrintField}
            key="euroBondsInWord"
            name="euroBondsInWord"
            label="in Worten"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
          <PrintableField<CurrencyFieldType>
            EditComponent={CurrencyFormikField}
            PrintComponent={FlushedCurrencyPrintField}
            key="totalSubsInEuro"
            name="totalSubsInEuro"
            label="Gesamtzeichnungssumme in Euro"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
          <PrintableField<StringFieldType>
            EditComponent={StringFormikField}
            PrintComponent={StringPrintField}
            key="totalSubsInWords"
            name="totalSubsInWords"
            label="in Worten"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
        ]}
      />
      <PrintableText mb={3}>Agio: 5 %</PrintableText>
      <PrintableField<RadioFieldType>
        EditComponent={RadioFormikField}
        PrintComponent={RadioPrintField}
        key="agio"
        name="agio"
        direction="column"
        mb={4}
        options={[
          { key: '1', label: 'Das Agio zahle ich in einer Summe', value: 'Das Agio zahle ich in einer Summe' },
          { key: '2', label: 'Das Agio zahle ich in gleichen Raten', value: 'Das Agio zahle ich in gleichen Raten' },
          {
            key: '3',
            label: 'Das Agio soll mit den ersten von der Emittentin zu leistenden Zahlungen zu 50 % verrechnet werden',
            value: 'Das Agio soll mit den ersten von der Emittentin zu leistenden Zahlungen zu 50 % verrechnet werden',
          },
          {
            key: '4',
            label: 'Das Agio soll mit den ersten von der Emittentin zu leistenden Zahlungen zu 100 % verrechnet werden',
            value: 'Das Agio soll mit den ersten von der Emittentin zu leistenden Zahlungen zu 100 % verrechnet werden',
          },
        ]}
        isRequired
      />
      <PrintableField<StringFieldType>
        EditComponent={StringFormikField}
        PrintComponent={StringPrintField}
        key="agioNote"
        name="agioNote"
        label="Vermerk"
        variant="flushed"
        showRequiredIcon={false}
        isRequired
      />
      <Divider my={3} borderColor="#E4E7EB" />
      <PrintableHeading as="h3" fontWeight={700} textDecor="underline">
        Einzahlung
      </PrintableHeading>
      <PrintableText mb={4}>
        Der Zeichnungsbetrag und das Agio sind 14 Tage nach Zugang der Information über die Annahme meines
        Zeichnungsscheins zur Zahlung durch Inlandsüberweisung auf das nachstehend genannte Konto der Emittentin zur
        Zahlung fällig.
      </PrintableText>
      <PrintableText mb={4}>
        Kontoinhaber: Deutsches Finanzkontor S.A., handelnd für das Compartment DFK 2020-1
      </PrintableText>
      <PrintableText mb={4}>IBAN: DE46 2003 0300 00 60 0500 01</PrintableText>
      <PrintableText mb={4}>BIC: CHDBDEHHXXX</PrintableText>
      <PrintableText mb={4}>
        Betreff: "Anleihe Deutsches Finanzkontor S.A., Compartment DFK 2020-1, ISIN LU2169803108, [ *** Name, Vorname,
        Wohnort des Anlegers *** ]"
      </PrintableText>
      <PrintableText mb={4}>
        Maßgeblich für die Erfüllung der Pflicht zur Zahlung des Erwerbspreises ist die Gutschrift des geschuldeten
        Betrags auf dem Konto der Emittentin.
      </PrintableText>
      <PrintableText mb={10}>
        Auszahlungen bitte ich, auf mein oben angegebenes Konto bei dem angegebenen in Deutschland ansässigen
        Kreditinstitut zu überweisen. Diese Anweisung gilt bis auf schriftlichen Widerruf. Eine Änderung der
        Bankverbindung sowie meiner übrigen gemäß dieser Zeichnung-serklärung angegebenen persönlichen Daten werde ich
        der Emittentin unverzüglich schriftlich mitteilen.
      </PrintableText>
      <PrintableHeading as="h3" fontWeight={700}>
        Folgen verspäteter Einzahlung
      </PrintableHeading>
      <PrintableText mb={5}>
        Für Zahlungen auf den Erwerbspreis zzgl. Agio, die nicht zum Fälligkeitstermin geleistet werden, kann die
        Emittentin mir Zinsen in Höhe von 5 Prozentpunkten p.a. über dem jeweils gültigen Basiszinssatz gemäß § 247 BGB
        berechnen. Soweit ich den Erwerbspreis zzgl. Agio trotz schriftlicher Fristsetzung mit Rücktrittsandrohung nicht
        bis zum Ablauf der Frist vollständig zahle, ist die Emittentin berechtigt, durch schriftliche Erklärung fristlos
        von dem Vertrag über die Zeichnung der jeweiligen Order-Teilschuldverschreibungen zurückzutreten. In diesem Fall
        erhalte ich sämtliche bislang geleisteten Zahlungen unverzinslich zurück.
      </PrintableText>
      <FormGridLayout
        mt={5}
        mb={5}
        columns={2}
        spacingX={5}
        fields={[
          <PrintableField<StringFieldType>
            EditComponent={StringFormikField}
            PrintComponent={StringPrintField}
            key="latePaymentPlaceAndDate"
            name="latePaymentPlaceAndDate"
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
            key="latePaymentDraftsmanSignature"
            name="latePaymentDraftsmanSignature"
            label="Unterschrift Zeichner"
            showRequiredIcon={false}
            rightIcon={<SignatureIcon mt={3} />}
            isRequired
          />,
        ]}
      />
      <Divider my={3} borderColor="#E4E7EB" />
      <PrintableHeading as="h4" fontWeight={700}>
        Informationen bei Datenverarbeitung
      </PrintableHeading>
      <PrintableText mb={5}>Die Emittentin teilt dem Anleger Folgendes mit:</PrintableText>
      <PrintableText mb={5}>
        (a) Verantwortlicher der Datenverarbeitung ist die Deutsches Finanzkontor S.A., handelnd für das Compartment DFK
        2020-1, 62, Avenue de la Liberté L-1930 Luxembourg, Großherzogtum Luxemburg, Telefonnr. +352 263778-1, Fax +352
        263778-26, E-Mail: info@dfksa.com;
      </PrintableText>
      <PrintableText mb={5}>
        (b) Die Datenverarbeitung erfolgt für die Zwecke der Umsetzung des mit der Zeichnung von Anleihen begründeten
        Rechtsverhältnisse zwischen der Emittentin Deutsches Finanzkontor S.A., handelnd für das Compartment DFK 2020-1,
        und dem Anleger. Die Rechtsgrundlage für die Verarbeitung ist der vom Anleger unterzeichnete Zeichnungsschein,
        also die Erfüllung des Vertrages mit dem Anleger nach Art. 6 Abs. 1 lit. b DSGVO.
      </PrintableText>
    </PageWrapper>
  );
};
