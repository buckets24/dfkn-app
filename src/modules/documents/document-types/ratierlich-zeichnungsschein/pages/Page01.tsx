/* eslint-disable react/no-unescaped-entities */
import React, { FC } from 'react';
import { Box, Divider } from '@chakra-ui/react';
import { DateFieldType, DateFormikField } from 'jexity-app/form/fields/DateField';
import { EmailFormikField } from 'jexity-app/form/fields/EmailField';
import { SignatureFormikField, SignaturePrintField } from 'src/components/signature-field/SignatureField';
import { StringFieldType, StringFormikField, StringPrintField } from 'jexity-app/form/fields/StringField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { SignatureIcon } from 'jexity-app/icons/SignatureIcon';
import { PrintableText } from 'src/modules/documents/PrintableText';
import { PrintableField } from 'src/modules/documents/PrintableField';
import { PageWrapper } from '../../common/PageWrapper';
import { DocumentHeader } from '../../common/DocumentHeader';
import { RatierlichZeichnungsscheinFooter } from '../RatierlichZeichnungsscheinFooter';
import { FlushedDatePrintField } from '../../common/FlushedDatePrintField';

export const Page01: FC = () => {
  return (
    <PageWrapper px={5} pt={5} footer={<RatierlichZeichnungsscheinFooter />}>
      <DocumentHeader
        title="Zeichnungsschein"
        compartmentDate="2020-2"
        subtitle="(Zeichnungs- und Begebungsvertrag)"
        note="(Stand: 25. Juni 2020)"
      />
      <Box mb={5}>
        <PrintableText>
          Order-Teilschuldverschreibung der Deutsches Finanzkontor S.A., Handelsregister (Registre de Commerce et des
          Sociétés) Luxemburg, Nr. B227961, handelnd für das Compartment DFK 2020-2
        </PrintableText>
        <PrintableText my={5}>Empfangsbestätigung</PrintableText>
        <PrintableText>
          Ich habe den Wertpapierprospekt vom 25. Juni 2020 mit dem darin abgedruckten Vertragswerk (insbesondere den
          Anleihebedingungen, den Genussscheinbedingungen und dem Darlehensvertrag) sowie dem beigelegten
          Basisinformationsblatt und der beigelegten Verbraucherinforma-tionen für außerhalb von Geschäftsräumen
          abgeschlossene Verträge erhalten, gelesen und verstanden und für mich eine Kopie dieses von mir
          unterzeichneten Zeichnungsscheins für die vorbezeichneten Order-Teilschuldverschreibungen erstellt.
        </PrintableText>
      </Box>
      <FormGridLayout
        columns={2}
        spacingX={5}
        fields={[
          <PrintableField<StringFieldType>
            EditComponent={StringFormikField}
            PrintComponent={StringPrintField}
            key="placeAndDate"
            name="placeAndDate"
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
            key="draftsmanSignature"
            name="draftsmanSignature"
            label="Unterschrift Zeichner"
            showRequiredIcon={false}
            rightIcon={<SignatureIcon mt={3} />}
            isRequired
          />,
        ]}
      />
      <Divider my={3} borderColor="#E4E7EB" />
      <Box>
        <PrintableText>
          Ich, der/die Unterzeichnende (nachfolgend der „
          <Box as="span" fontWeight="bold">
            Zeichner
          </Box>
          “)
        </PrintableText>
        <FormGridLayout
          mt={5}
          columns={2}
          spacingX={5}
          fields={[
            <PrintableField<StringFieldType>
              EditComponent={StringFormikField}
              PrintComponent={StringPrintField}
              key="firstName"
              name="firstName"
              label="Vorname"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
            />,
            <PrintableField<StringFieldType>
              EditComponent={StringFormikField}
              PrintComponent={StringPrintField}
              key="identitiyCardOrPassport"
              name="identitiyCardOrPassport"
              label="Nr. Personalausweis oder Reisepass"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
            />,
            <PrintableField<StringFieldType>
              EditComponent={StringFormikField}
              PrintComponent={StringPrintField}
              key="lastName"
              name="lastName"
              label="Nachname"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
            />,
            [
              <PrintableField<StringFieldType & DateFieldType>
                type="dateFormField"
                EditComponent={DateFormikField}
                PrintComponent={FlushedDatePrintField}
                key="dateOfExpiry"
                name="dateOfExpiry"
                label="Gültig bis"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
                disablePastDates
              />,
              <PrintableField<StringFieldType>
                EditComponent={StringFormikField}
                PrintComponent={StringPrintField}
                key="issuingAuthority"
                name="issuingAuthority"
                label="Ausstellende Behörde"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
              />,
            ],
            <PrintableField<StringFieldType>
              EditComponent={StringFormikField}
              PrintComponent={StringPrintField}
              key="title"
              name="title"
              label="Titel"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
            />,
            <PrintableField<StringFieldType>
              EditComponent={StringFormikField}
              PrintComponent={StringPrintField}
              key="telephone"
              name="telephone"
              label="Telefon (beste Erreichbarkeit)"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
            />,
            <PrintableField<StringFieldType>
              EditComponent={StringFormikField}
              PrintComponent={StringPrintField}
              key="streetHouseNumber"
              name="streetHouseNumber"
              label="Straße/Hausnummer"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
            />,
            <PrintableField<StringFieldType>
              type="emailFormField"
              EditComponent={EmailFormikField}
              PrintComponent={StringPrintField}
              key="email"
              name="email"
              label="E-Mail"
              variant="flushed"
              showRequiredIcon={false}
              isReadOnly
              isRequired
            />,
            [
              <PrintableField<StringFieldType>
                EditComponent={StringFormikField}
                PrintComponent={StringPrintField}
                key="postCode"
                name="postCode"
                label="PLZ"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
              />,
              <PrintableField<StringFieldType>
                EditComponent={StringFormikField}
                PrintComponent={StringPrintField}
                key="place"
                name="place"
                label="Ort"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
              />,
            ],
            <PrintableField<StringFieldType>
              EditComponent={StringFormikField}
              PrintComponent={StringPrintField}
              key="job"
              name="job"
              label="Beruf"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
            />,
            <PrintableField<StringFieldType>
              EditComponent={StringFormikField}
              PrintComponent={StringPrintField}
              key="country"
              name="country"
              label="Land"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
            />,
            <PrintableField<StringFieldType>
              EditComponent={StringFormikField}
              PrintComponent={StringPrintField}
              key="residentTaxOffice"
              name="residentTaxOffice"
              label="Wohnsitzfinanzamt"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
            />,
            [
              <PrintableField<StringFieldType>
                EditComponent={StringFormikField}
                PrintComponent={StringPrintField}
                key="birthPlace"
                name="birthPlace"
                label="Geburtsort"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
              />,
              <PrintableField<DateFieldType>
                EditComponent={DateFormikField}
                PrintComponent={FlushedDatePrintField}
                key="birthday"
                name="birthday"
                label="Geburtsdatum"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
                disableFutureDates
              />,
            ],
            <PrintableField<StringFieldType>
              EditComponent={StringFormikField}
              PrintComponent={StringPrintField}
              key="taxId"
              name="taxId"
              label="Steueridentifikationsnummer"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
            />,
            <PrintableField<StringFieldType>
              EditComponent={StringFormikField}
              PrintComponent={StringPrintField}
              key="nationality"
              name="nationality"
              label="Staatsangehörigkeit"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
            />,
            <PrintableField<StringFieldType>
              EditComponent={StringFormikField}
              PrintComponent={StringPrintField}
              key="taxNumber"
              name="taxNumber"
              label="Steuernummer"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
            />,
            [
              <PrintableField<StringFieldType>
                EditComponent={StringFormikField}
                PrintComponent={StringPrintField}
                key="bank"
                name="bank"
                label="Bank"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
              />,
              <PrintableField<StringFieldType>
                EditComponent={StringFormikField}
                PrintComponent={StringPrintField}
                key="blz"
                name="blz"
                label="BLZ"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
              />,
            ],
            <PrintableField<StringFieldType>
              EditComponent={StringFormikField}
              PrintComponent={StringPrintField}
              key="iban"
              name="iban"
              label="IBAN"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
            />,
            [
              <PrintableField<StringFieldType>
                EditComponent={StringFormikField}
                PrintComponent={StringPrintField}
                key="bankAccountNumber"
                name="bankAccountNumber"
                label="Kontonummer"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
              />,
              <PrintableField<StringFieldType>
                EditComponent={StringFormikField}
                PrintComponent={StringPrintField}
                key="bic"
                name="bic"
                label="BIC"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
              />,
            ],
            <PrintableField<StringFieldType>
              EditComponent={StringFormikField}
              PrintComponent={StringPrintField}
              key="accountOwner"
              name="accountOwner"
              label="Kontoinhaber"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
            />,
          ]}
        />
        <PrintableText mt={5}>
          biete hiermit der Deutsches Finanzkontor S.A., Handelsregister (Registre de Commerce et des Sociétés)
          Luxemburg, Nr. B227961, handelnd für das Compart-ment DFK 2020-2 (die{' '}
          <PrintableText as="span" fontWeight="bold">
            "Emittentin"
          </PrintableText>
          ) den Abschluss eines Begebungsvertrags für Order-Teilschuldverschreibungen mit der ISIN LU2169803108 auf
          Grundlage der im Wertpapierprospekt abgedruckten Anleihebedingungen (die{' '}
          <PrintableText as="span" fontWeight="bold">
            "Anleihebedingungen"
          </PrintableText>
          ) in der nachfolgend angegebenen Zahl und Höhe an. Der Begebungsvertrag kommt zustande, wenn die Emittentin
          meinen unterzeichneten Zeichnungsschein annimmt (die{' '}
          <PrintableText as="span" fontWeight="bold">
            "Annahmeerklärung"
          </PrintableText>
          ). Die Annahmeerklärung steht im freien Ermessen der Emittentin und kann in jedem Fall erst dann erfolgen,
          wenn die Emittentin hinsichtlich meiner Person alle zur Geldwäscheprüfung erforderlichen Unterlagen erhalten
          hat. Auf den Zugang der Annahmeerklärung als Voraussetzung des Zustandekommens des Begebungsvertrags verzichte
          ich hiermit, jedoch wird mir als unterrichtende Mitteilung über die Annahme meines Zeichnungsscheins eine
          Kopie meines angenommenen Zeichnungsscheins zugesandt. Nachdem mein Zeichnungsschein durch die Emittentin
          angenommen wurde und der Zeichnungsbetrag vollständig auf dem nachstehend angegebenen Konto der Emittentin
          eingegangen ist, bin ich ab dem Tag, der der Zahlung des Zeichnungsbetrages an die Emittentin folgt, in Höhe
          der von mir gezeichneten Order-Teilschuldverschreibungen nach Maßgaben der Anleihebedingungen zinsberechtigt.
        </PrintableText>
      </Box>
    </PageWrapper>
  );
};
