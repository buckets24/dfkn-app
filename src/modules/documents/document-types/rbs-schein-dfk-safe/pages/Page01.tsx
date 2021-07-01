/* eslint-disable react/no-unescaped-entities */
import React, { FC, useEffect, useState } from 'react';
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
import { useFormikByName } from 'jexity-app/form/useFormikByName';

export const Page01: FC = () => {
  const contracts = [1, 2, 3]; // Number of contracts to be looped
  const { printMode } = useDocFormMeta();
  const { value: totalCommision1 } = useFormikByName('totalCommision1');
  const { value: totalCommision2 } = useFormikByName('totalCommision2');
  const { value: totalCommision3 } = useFormikByName('totalCommision3');
  const [totalCommUnit, setTotalCommUnit] = useState<number>();
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

  useEffect(() => {
    setTotalCommUnit(
      ((parseFloat(totalCommision1 ?? 0) + parseFloat(totalCommision2 ?? 0) + parseFloat(totalCommision3 ?? 0)) *
        0.45) /
        50
    );
  }, [totalCommision1, totalCommision2, totalCommision3]);

  return (
    <PageWrapper px={5} footer={<RBSFooter mt={printMode ? 1 : 20} />}>
      <Flex justifyContent="space-between" mb={printMode ? 0 : 5}>
        <Box mt="auto">
          <Heading fontFamily="body" fontSize={printMode ? 'lg' : 'xl'} lineHeight={1.1}>
            Begleitschein
          </Heading>
          <PrintableText fontWeight="bold" color="documents.primary.900">
            Versicherungen über Blaudirekt
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
              key="job"
              name="job"
              label="Beruf"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
            />,
          ]}
        />
      </Grid>
      <FormGridLayout
        columns={2}
        spacingX={5}
        fields={[
          [
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
          ],
          [
            <PrintableField<StringFieldType>
              EditComponent={StringFormikField}
              PrintComponent={StringPrintField}
              key="email"
              name="email"
              label="E-Mail"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
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
              key="streetHouseNumber"
              name="streetHouseNumber"
              label="Straße, Hausnummer"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
            />,
          ],

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
      <Grid templateColumns="repeat(4, 1fr)" gap={2}>
        {contracts.map((_, i) => {
          return (
            <>
              <PrintableField<StringFieldType>
                EditComponent={StringFormikField}
                PrintComponent={StringPrintField}
                key={`society${i + 1}`}
                name={`society${i + 1}`}
                label={`${i + 1}.) Gesellschaft`}
                variant="flushed"
                showRequiredIcon={false}
                isRequired
              />
              <PrintableField<StringFieldType>
                EditComponent={StringFormikField}
                PrintComponent={StringPrintField}
                key={`product${i + 1}`}
                name={`product${i + 1}`}
                label="Produkt"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
              />
              <PrintableField<StringFieldType & DateFieldType>
                EditComponent={DateFormikField}
                PrintComponent={FlushedDatePrintField}
                key={`beginning${i + 1}`}
                name={`beginning${i + 1}`}
                label="Beginn"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
                disableFutureDates
              />
              <PrintableField<CurrencyFieldType>
                EditComponent={CurrencyFormikField}
                PrintComponent={CurrencyPrintField}
                key={`totalCommision${i + 1}`}
                name={`totalCommision${i + 1}`}
                label="Gesamtprovision  lt. BlauDirekt"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
              />
            </>
          );
        })}
      </Grid>
      <PrintableField<CurrencyFieldType>
        EditComponent={CurrencyFormikField}
        PrintComponent={CurrencyPrintField}
        key="commUnit"
        name="commUnit"
        label="Einheiten"
        variant="flushed"
        value={totalCommUnit ? Math.round(totalCommUnit * 1000) / 1000 : ''}
        showRequiredIcon={false}
        symbol={false}
        disabled
        errorMessageSpacer={false}
        ml="auto"
        pl="5px"
        maxW="25%"
        w="100%"
      />
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
