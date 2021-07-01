/* eslint-disable react/no-unescaped-entities */
import React, { FC } from 'react';
import { Box, Flex, Grid, Heading } from '@chakra-ui/react';
import { StringFieldType, StringFormikField, StringPrintField } from 'jexity-app/form/fields/StringField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { RadioFieldType, RadioFormikField, RadioPrintField } from 'jexity-app/form/fields/RadioField';
import { PrintableField } from 'src/modules/documents/PrintableField';
import { PrintableText } from 'src/modules/documents/PrintableText';
import { PageWrapper } from '../../common/PageWrapper';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { DateFieldType, DateFormikField } from 'jexity-app/form/fields/DateField';
import { FlushedDatePrintField } from '../../common/FlushedDatePrintField';
import { CurrencyFieldType, CurrencyFormikField, CurrencyPrintField } from 'jexity-app/form/fields/CurrencyField';
import { DFKLogo } from '../../investment-kompass/icons/DFKLogo';
import { ParticipantDetails } from '../../common/ParticipantDetails';
import { RBSFooter } from '../../common/RBSFooter';

export const Page01: FC = () => {
  const contracts = [1, 2, 3]; // Number of contracts to be looped
  const { printMode } = useDocFormMeta();
  const personsInvolved = [
    {
      title: '',
      name: 'personsInvolved1',
    },
    {
      title: '',
      name: 'personsInvolved2',
    },
    {
      title: '',
      name: 'personsInvolved3',
    },
    {
      title: '',
      name: 'personsInvolved4',
    },
    {
      title: '',
      name: 'personsInvolved5',
    },
    {
      title: '',
      name: 'personsInvolved6',
    },
    {
      title: '',
      name: 'personsInvolved7',
    },
  ];

  return (
    <PageWrapper px={5} footer={<RBSFooter mt={printMode ? 1 : 20} />}>
      <Flex justifyContent="space-between" mb={printMode ? 0 : 5}>
        <Box mt="auto">
          <Heading fontFamily="body" fontSize={printMode ? 'lg' : 'xl'} lineHeight={1.1}>
            Begleitschein
          </Heading>
          <PrintableText fontWeight="bold" color="documents.primary.900">
            Leistungsnachweis für sonstige Produkte
          </PrintableText>
        </Box>
        <DFKLogo w={printMode ? '80px' : '100px'} color="documents.primary.600" />
      </Flex>
      <Grid templateColumns="1fr 1fr" gap={5}>
        <Flex alignItems={printMode ? 'flex-start' : 'center'}>
          <PrintableText fontWeight="bold" mr={5} mb={printMode ? 0 : 8}>
            Antragsteller
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
        columns={2}
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
          [
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
              key="telephone"
              name="telephone"
              label="Telefon"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
            />,
          ],
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
        ]}
      />
      <PrintableText fontWeight="bold" mr={5} mb={printMode ? 0 : '1.6rem'}>
        Beantragte Verträge
      </PrintableText>
      <Grid templateColumns="repeat(5, 1fr)" gap={2}>
        {contracts.map((contract) => {
          return (
            <>
              <PrintableField<StringFieldType>
                EditComponent={StringFormikField}
                PrintComponent={StringPrintField}
                key={`society${contract}`}
                name={`society${contract}`}
                label={`${contract}.) Gesellschaft`}
                variant="flushed"
                showRequiredIcon={false}
                isRequired
              />
              <PrintableField<StringFieldType>
                EditComponent={StringFormikField}
                PrintComponent={StringPrintField}
                key={`product${contract}`}
                name={`product${contract}`}
                label="Produkt"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
              />
              <PrintableField<StringFieldType>
                EditComponent={StringFormikField}
                PrintComponent={StringPrintField}
                key={`runningTime${contract}`}
                name={`runningTime${contract}`}
                label="Laufzeit"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
              />
              <PrintableField<CurrencyFieldType>
                EditComponent={CurrencyFormikField}
                PrintComponent={CurrencyPrintField}
                key={`contribution${contract}`}
                name={`contribution${contract}`}
                label="Beitrag"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
              />
              <PrintableField<CurrencyFieldType>
                EditComponent={CurrencyFormikField}
                PrintComponent={CurrencyPrintField}
                key={`commUnit${contract}`}
                name={`commUnit${contract}`}
                label="Einheiten"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
                symbol={false}
              />
            </>
          );
        })}
      </Grid>
      <PrintableText mb={0} fontWeight="bold">
        Bei Vertragsabschluss mitwirkende Personen
      </PrintableText>
      <ParticipantDetails personsInvolved={personsInvolved} />
      <PrintableText mb={1} color="documents.tertiary.500">
        * 1 = Investment Kompass, 2 = Erstberatung, 3 = Zweitberatung, 4 = Angebotserstellung, 5 = Antragsrecherche, 6 =
        Nachbearbeitung, 7 = Konzeptüberbringung
      </PrintableText>
    </PageWrapper>
  );
};
