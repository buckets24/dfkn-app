/* eslint-disable react/no-unescaped-entities */
import React, { FC, useEffect } from 'react';
import { Box, Divider, Flex, Grid, Heading } from '@chakra-ui/react';
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
  const { printMode } = useDocFormMeta();
  const { value: sellingPrice, setFieldValue } = useFormikByName('sellingPrice');
  const { value: nettCommissionPercent } = useFormikByName('nettCommissionPercent');
  const personsInvolved = [
    {
      title: 'Vermittler',
      name: 'intermediary',
    },
    {
      title: 'Makler',
      name: 'estateAgents',
    },
    {
      title: 'Direktor',
      name: 'director',
    },
  ];

  useEffect(() => {
    if (sellingPrice && nettCommissionPercent) {
      const commissionAmmount = parseFloat(sellingPrice) * (parseFloat(nettCommissionPercent) / 100);
      setFieldValue?.('commissionAmountIn100', commissionAmmount);
      setFieldValue?.('commissionAmountIn45', commissionAmmount * 0.45);
      setFieldValue?.('commUnit', (commissionAmmount * 0.45) / 50);
    }
  }, [sellingPrice, nettCommissionPercent, setFieldValue]);

  return (
    <PageWrapper px={5} footer={<RBSFooter />}>
      <Flex justifyContent="space-between" mb={printMode ? 0 : 5}>
        <Box mt="auto">
          <Heading fontFamily="body" fontSize={printMode ? 'lg' : 'xl'} lineHeight={1.1}>
            Begleitschein DFK Home
          </Heading>
          <PrintableText fontWeight="bold" color="documents.primary.900">
            Maklerprovision
          </PrintableText>
        </Box>
        <DFKLogo w={printMode ? '80px' : '100px'} color="documents.primary.600" />
      </Flex>
      <Grid templateColumns="1fr 1fr" gap={5}>
        <Flex alignItems={printMode ? 'flex-start' : 'center'}>
          <PrintableText fontWeight="bold" mr={5} mb={printMode ? 0 : '1.6rem'}>
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
        <PrintableText key="realEstateLoanLabel" fontSize={printMode ? 'md' : 'lg'} fontWeight={500}>
          Immobilie
        </PrintableText>
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
            key="streetNumber"
            name="streetNumber"
            label="Anschrift"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
          />,
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
          <PrintableField<CurrencyFieldType>
            EditComponent={CurrencyFormikField}
            PrintComponent={CurrencyPrintField}
            key="sellingPrice"
            name="sellingPrice"
            label="Verkaufspreis"
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
          <PrintableField<CurrencyFieldType>
            EditComponent={CurrencyFormikField}
            PrintComponent={CurrencyPrintField}
            key="nettCommissionPercent"
            name="nettCommissionPercent"
            label="Nettoprovision un %"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
            symbol={false}
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
          <PrintableField<CurrencyFieldType>
            EditComponent={CurrencyFormikField}
            PrintComponent={CurrencyPrintField}
            key="commissionAmountIn100"
            name="commissionAmountIn100"
            label="Provisionshöhe in Euro 100"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
            disabled
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
          <PrintableField<CurrencyFieldType>
            EditComponent={CurrencyFormikField}
            PrintComponent={CurrencyPrintField}
            key="commissionAmountIn45"
            name="commissionAmountIn45"
            label="davon Provisionshöhe in Euro 45%"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
            disabled
          />,
          <Box key="commUnits">
            <PrintableText key="realEstateLoanLabel" fontSize={printMode ? 'md' : 'lg'} fontWeight={500}>
              EH
            </PrintableText>
            <PrintableField<CurrencyFieldType>
              EditComponent={CurrencyFormikField}
              PrintComponent={CurrencyPrintField}
              key="commUnit"
              name="commUnit"
              label="EH = (45% Provision / Teiler 50)"
              variant="flushed"
              showRequiredIcon={false}
              symbol={false}
              isRequired
              disabled
            />
          </Box>,
        ]}
      />
      <Divider mb={printMode ? 2 : 4} borderColor="#E4E7EB" />
      <ParticipantDetails personsInvolved={personsInvolved} />
      <PrintableText mb={3} color="documents.tertiary.500">
        * 1 = Investment Kompass, 2 = Erstberatung, 3 = Zweitberatung, 4 = Angebotserstellung, 5 = Antragsrecherche, 6=
        Nachbearbeitung
      </PrintableText>
    </PageWrapper>
  );
};
