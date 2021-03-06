/* eslint-disable react/no-unescaped-entities */
import React, { FC } from 'react';
import { Box, Divider, Text } from '@chakra-ui/react';
import { StringFieldType, StringFormikField, StringPrintField } from 'jexity-app/form/fields/StringField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { RadioFieldType, RadioFormikField, RadioPrintField } from 'jexity-app/form/fields/RadioField';
import { SignatureFormikField, SignaturePrintField } from 'src/components/signature-field/SignatureField';
import { SignatureIcon } from 'jexity-app/icons/SignatureIcon';
import { PrintableHeading } from 'src/modules/documents/PrintableHeading';
import { PrintableField } from 'src/modules/documents/PrintableField';
import { PrintableText } from 'src/modules/documents/PrintableText';
import { PageWrapper } from '../../common/PageWrapper';
import { RatierlichZeichnungsscheinFooter } from '../RatierlichZeichnungsscheinFooter';
import { CurrencyFieldType, CurrencyFormikField } from 'jexity-app/form/fields/CurrencyField';
import { FlushedCurrencyPrintField } from '../../common/FlushedCurrencyPrintField';

export const Page02: FC = () => {
  return (
    <PageWrapper px={5} pt={5} className="no-page-break" footer={<RatierlichZeichnungsscheinFooter />}>
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
      <Text mb={3}>Agio: 5 %</Text>
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
        Der Zeichnungsbetrag und das Agio sind 14 Tage nach Zugang der Information ??ber die Annahme meines
        Zeichnungsscheins zur Zahlung durch Inlands??berweisung auf das nachstehend genannte Konto der Emittentin zur
        Zahlung f??llig
      </PrintableText>
      <PrintableText mb={4}>
        Kontoinhaber: Deutsches Finanzkontor S.A., handelnd f??r das Compartment DFK 2020-2
      </PrintableText>
      <PrintableText mb={4}>IBAN: DE46 2003 0300 00 60 0500 01</PrintableText>
      <PrintableText mb={4}>BIC: CHDBDEHHXXX</PrintableText>
      <PrintableText mb={4}>
        Betreff: "Anleihe Deutsches Finanzkontor S.A., Compartment DFK 2020-2, ISIN LU2169803108, [ *** Name, Vorname,
        Wohnort des Anlegers *** ]"
      </PrintableText>
      <PrintableText mb={4}>
        Ma??geblich f??r die Erf??llung der Pflicht zur Zahlung des Erwerbspreises ist die Gutschrift des geschuldeten
        Betrags auf dem Konto der Emittentin
      </PrintableText>
      <PrintableText mb={10}>
        Auszahlungen bitte ich, auf mein oben angegebenes Konto bei dem angegebenen in Deutschland ans??ssigen
        Kreditinstitut zu ??berweisen. Diese Anweisung gilt bis auf schriftlichen Widerruf. Eine ??nderung der
        Bankverbindung sowie meiner ??brigen gem???? dieser Zeichnung-serkl??rung angegebenen pers??nlichen Daten werde ich
        der Emittentin unverz??glich schriftlich mitteilen.
      </PrintableText>
      <PrintableHeading as="h3" fontWeight={700}>
        Folgen versp??teter Einzahlung
      </PrintableHeading>
      <PrintableText mb={5}>
        F??r Zahlungen auf den Erwerbspreis zzgl. Agio, die nicht zum F??lligkeitstermin geleistet werden, kann die
        Emittentin mir Zinsen in H??he von 5 Prozentpunkten p.a. ??ber dem jeweils g??ltigen Basiszinssatz gem???? ?? 247 BGB
        berechnen. Soweit ich den Erwerbspreis zzgl. Agio trotz schriftlicher Fristsetzung mit R??cktrittsandrohung nicht
        bis zum Ablauf der Frist vollst??ndig zahle, ist die Emittentin berechtigt, durch schriftliche Erkl??rung fristlos
        von dem Vertrag ??ber die Zeichnung der jeweiligen Order-Teilschuldverschreibungen zur??ckzutreten. In diesem Fall
        erhalte ich s??mtliche bislang geleisteten Zahlungen unverzinslich zur??ck.
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
        (a) Verantwortlicher der Datenverarbeitung ist die Deutsches Finanzkontor S.A., handelnd f??r das Compartment DFK
        2020-2, 62, Avenue de la Libert?? L-1930 Luxembourg, Gro??herzogtum Luxemburg, Telefonnr. +352 263778-1, Fax +352
        263778-26, E-Mail: info@dfksa.com;
      </PrintableText>
      <PrintableText mb={5}>
        (b) Die Datenverarbeitung erfolgt f??r die Zwecke der Umsetzung des mit der Zeichnung von Anleihen begr??ndeten
        Rechtsverh??ltnisse zwischen der Emittentin Deutsches Finanzkontor S.A., handelnd f??r das Compartment DFK 2020-2,
        und dem Anleger. Die Rechtsgrundlage f??r die Verarbeitung ist der vom Anleger unterzeichnete Zeichnungsschein,
        also die Erf??llung des Vertrages mit dem Anleger nach Art. 6 Abs. 1 lit. b DSGVO.
      </PrintableText>
    </PageWrapper>
  );
};
