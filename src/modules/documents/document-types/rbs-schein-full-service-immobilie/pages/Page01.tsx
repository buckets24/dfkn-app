/* eslint-disable react/no-unescaped-entities */
import React, { FC, useEffect, useState } from 'react';
import { Box, Divider, Flex, Grid, Heading } from '@chakra-ui/react';
import { CurrencyFieldType, CurrencyFormikField, CurrencyPrintField } from 'jexity-app/form/fields/CurrencyField';
import { DateFieldType, DateFormikField } from 'jexity-app/form/fields/DateField';
import { RadioFieldType, RadioFormikField, RadioPrintField } from 'jexity-app/form/fields/RadioField';
import { StringFieldType, StringFormikField, StringPrintField } from 'jexity-app/form/fields/StringField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { PrintableField } from 'src/modules/documents/PrintableField';
import { PrintableText } from 'src/modules/documents/PrintableText';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { FlushedDatePrintField } from '../../common/FlushedDatePrintField';
import { PageWrapper } from '../../common/PageWrapper';
import { DFKLogo } from '../../investment-kompass/icons/DFKLogo';
import { CheckboxFormikField } from 'jexity-app/form/fields/CheckboxField';
import { EmailFormikField } from 'jexity-app/form/fields/EmailField';
import { RBSFooter } from '../../common/RBSFooter';
import { useFormikByName } from 'jexity-app/form/useFormikByName';
import { MultilineStringFormikField } from 'jexity-app/form/fields/MultilineStringField';
import { ParticipantDetails } from '../../common/ParticipantDetails';

export const Page01: FC = () => {
  const { printMode } = useDocFormMeta();
  const { value: propertyPriceSalesOrder } = useFormikByName('propertyPriceSalesOrder');
  const { value: commDivider } = useFormikByName('commDivider');
  const { value: commFactor } = useFormikByName('commFactor');
  const [totalCommUnits, setTotalCommUnits] = useState<number>(0);
  const personsInvolved = [
    {
      title: 'Vermittler',
      name: 'intermediary',
    },
    {
      title: 'Direktor',
      name: 'director',
    },
  ];

  useEffect(() => {
    if (propertyPriceSalesOrder && commDivider && commFactor) {
      setTotalCommUnits((parseFloat(propertyPriceSalesOrder) / parseFloat(commDivider)) * commFactor);
    }
  }, [propertyPriceSalesOrder, commDivider, commFactor]);

  return (
    <PageWrapper px={5} footer={<RBSFooter mt={printMode ? 1 : 20} />}>
      <Flex justifyContent="space-between" mb={printMode ? 0 : 5}>
        <Box mt="auto">
          <Heading fontFamily="body" fontSize={printMode ? 'lg' : 'xl'} lineHeight={1.1}>
            Begleitschein Immobilie
          </Heading>
          <PrintableText fontWeight="bold" color="documents.primary.900">
            Leistungsnachweis für einzelne Beratungsschritte
          </PrintableText>
        </Box>
        <DFKLogo w={printMode ? '80px' : '100px'} color="documents.primary.600" />
      </Flex>
      <Grid templateColumns="1fr 1fr 1fr 1fr" gap={5}>
        <Flex alignItems={printMode ? 'flex-start' : 'center'}>
          <PrintableText fontWeight={500} fontSize={printMode ? 'md' : 'lg'} mr={5} mb={printMode ? 0 : 10}>
            Käufer
          </PrintableText>
          <PrintableField<RadioFieldType>
            EditComponent={RadioFormikField}
            PrintComponent={RadioPrintField}
            key="salutation"
            name="salutation"
            direction="row"
            options={[
              {
                key: '1',
                label: 'Frau',
                value: 'Frau',
              },
              {
                key: '2',
                label: 'Herr',
                value: 'Herr',
              },
            ]}
            isRequired
          />
        </Flex>
      </Grid>
      <FormGridLayout
        columns={4}
        spacingX={5}
        fields={[
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
            key="lastName"
            name="lastName"
            label="Name"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
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
          <PrintableField<StringFieldType & DateFieldType>
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
          <PrintableField<StringFieldType>
            EditComponent={StringFormikField}
            PrintComponent={StringPrintField}
            key="streetHouseNumber"
            name="streetHouseNumber"
            label="Straße, Hausnummer"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
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
        ]}
      />
      <PrintableText fontSize={printMode ? 'md' : 'lg'} fontWeight={500}>
        2. Vertragspartner
      </PrintableText>
      <FormGridLayout
        columns={4}
        spacingX={5}
        fields={[
          <PrintableField<StringFieldType>
            EditComponent={StringFormikField}
            PrintComponent={StringPrintField}
            key="contractorTitle"
            name="contractorTitle"
            label="Titel"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
          <PrintableField<StringFieldType>
            EditComponent={StringFormikField}
            PrintComponent={StringPrintField}
            key="contractorLastName"
            name="contractorLastName"
            label="Name"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
          <PrintableField<StringFieldType>
            EditComponent={StringFormikField}
            PrintComponent={StringPrintField}
            key="contractorFirstName"
            name="contractorFirstName"
            label="Vorname"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
          <PrintableField<StringFieldType & DateFieldType>
            EditComponent={DateFormikField}
            PrintComponent={FlushedDatePrintField}
            key="contractorBirthDate"
            name="contractorBirthDate"
            label="Geburtsdatum"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
            disableFutureDates
          />,
        ]}
      />
      <PrintableText fontSize={printMode ? 'md' : 'lg'} fontWeight={500}>
        Objekt
      </PrintableText>
      <FormGridLayout
        columns={4}
        spacingX={3}
        fields={[
          <PrintableField<StringFieldType>
            EditComponent={StringFormikField}
            PrintComponent={StringPrintField}
            key="propertyZip"
            name="propertyZip"
            label="PLZ"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
          <PrintableField<StringFieldType>
            EditComponent={StringFormikField}
            PrintComponent={StringPrintField}
            key="propertyCity"
            name="propertyCity"
            label="Ort"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
          <PrintableField<StringFieldType>
            EditComponent={StringFormikField}
            PrintComponent={StringPrintField}
            key="propertyStreet"
            name="propertyStreet"
            label="Anschrift"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
          <PrintableField<CurrencyFieldType>
            EditComponent={CurrencyFormikField}
            PrintComponent={CurrencyPrintField}
            key="propertyNumResidentialUnits"
            name="propertyNumResidentialUnits"
            label="Wohneinheit"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
            symbol={false}
          />,
          <PrintableField<CurrencyFieldType>
            EditComponent={CurrencyFormikField}
            PrintComponent={CurrencyPrintField}
            key="propertyPriceContract"
            name="propertyPriceContract"
            label="Kaufpreis gem. Kaufvertrag"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
          <PrintableField<CurrencyFieldType>
            EditComponent={CurrencyFormikField}
            PrintComponent={CurrencyPrintField}
            key="propertyPriceSalesOrder"
            name="propertyPriceSalesOrder"
            label="Kaufpreis gem. Verkaufsaufgabe"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
          <PrintableField<StringFieldType & DateFieldType>
            EditComponent={DateFormikField}
            PrintComponent={FlushedDatePrintField}
            key="dateOfSale"
            name="dateOfSale"
            label="Verkaufsdatum"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
            disableFutureDates
          />,
          <PrintableField<CurrencyFieldType>
            EditComponent={CurrencyFormikField}
            PrintComponent={CurrencyPrintField}
            key="reservationAmount"
            name="reservationAmount"
            label="Reservierungssumme"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
        ]}
      />
      <Divider mb={printMode ? 2 : 4} borderColor="#E4E7EB" />
      <Grid templateColumns="1fr 1fr 1fr" gap={5}>
        <Box>
          <PrintableText mb={4} fontSize={printMode ? 'md' : 'lg'} fontWeight={500}>
            Teiler{' '}
            <Box as="span" color="documents.tertiary.500" fontSize="sm" fontWeight="normal">
              (gemäß Einheitenbewertungstabelle)
            </Box>
          </PrintableText>
          <PrintableField<CurrencyFieldType>
            EditComponent={CurrencyFormikField}
            PrintComponent={CurrencyPrintField}
            key="commDivider"
            name="commDivider"
            label="Teiler"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
            symbol={false}
          />
        </Box>
        <Box>
          <PrintableText mb={4} fontSize={printMode ? 'md' : 'lg'} fontWeight={500}>
            Faktor
          </PrintableText>
          <PrintableField<RadioFieldType>
            EditComponent={RadioFormikField}
            PrintComponent={RadioPrintField}
            key="commFactor"
            name="commFactor"
            direction="row"
            fontSize="sm"
            options={[
              {
                key: '1',
                label: '1 (mit DFM finanziert / Barkäfer)',
                value: '1',
              },
              {
                key: '2',
                label: '0,95 (ohne DFM)',
                value: '0.95',
              },
            ]}
            isRequired
          />
        </Box>
        <PrintableField<CurrencyFieldType>
          EditComponent={CurrencyFormikField}
          PrintComponent={CurrencyPrintField}
          key="commUnit"
          name="commUnit"
          label="Einheiten"
          variant="flushed"
          value={totalCommUnits ? Math.round(totalCommUnits * 1000) / 1000 : ''}
          showRequiredIcon={false}
          symbol={false}
          mt="auto"
          disabled
        />
      </Grid>
      <Divider mb={printMode ? 2 : 4} borderColor="#E4E7EB" />
      <PrintableText fontSize={printMode ? 'md' : 'lg'} fontWeight={500} mb={0}>
        Besondere Vereinbarungen{' '}
        <Box as="span" color="documents.tertiary.500" fontSize="sm" fontWeight="normal">
          (z.B. Gutscheineinsatz, sonstige Kaufpreisanpassungen)
        </Box>
      </PrintableText>
      <MultilineStringFormikField
        variant="flushed"
        key="specialAgreements"
        name="specialAgreements"
        showRequiredIcon={false}
        multirow
        isRequired
        h={printMode ? '65px' : '70px'}
        size="md"
        mb={5}
      />
      <Grid templateColumns="1fr max-content" gap={5}>
        <Box>
          <PrintableText fontSize={printMode ? 'md' : 'lg'} fontWeight={500}>
            Provisionsauszahlung
          </PrintableText>
          <CheckboxFormikField name="commPayment" label="1-Hälfte der Provision mit Verzicht*" />
          <PrintableText mt={2} color="documents.tertiary.500" fontSize="sm" fontWeight="normal">
            *Die Bitte um Provisionsauszahlung mit Verzicht ist nur einmal möglich - mit Einreichung des
            Begleitscheines. Danach gilt, Provisionsauszahlung erst nach Kaufpreiseingang.
          </PrintableText>
        </Box>
        <CheckboxFormikField name="marketingFond" label="10€ p. EH an Marketingfond" />
      </Grid>
      <Divider mb={printMode ? 2 : 4} borderColor="#E4E7EB" />
      <ParticipantDetails personsInvolved={personsInvolved} />
      <PrintableText color="documents.tertiary.500">
        * 1 = Investment Kompass, 2 = Erstberatung, 3 = Zweitberatung, 4 = Angebotserstellung, 5 = Antragsrecherche, 6=
        Nachbearbeitung
      </PrintableText>
    </PageWrapper>
  );
};
