/* eslint-disable react/no-unescaped-entities */
import React, { FC, useEffect, useState } from 'react';
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
import { CheckboxFormikField } from 'jexity-app/form/fields/CheckboxField';
import { DFKLogo } from '../../investment-kompass/icons/DFKLogo';
import { NumCommUnits } from '../../ratierlich-zeichnungsschein/components/NumCommUnits';
import { ParticipantDetails } from '../../common/ParticipantDetails';
import { RBSFooter } from '../../common/RBSFooter';
import { useFormikByName } from 'jexity-app/form/useFormikByName';

export const Page01: FC = () => {
  const { printMode } = useDocFormMeta();
  const { value: commissionRateInPercentage } = useFormikByName('commissionRateInPercentage');
  const { value: loanCreaditAmountInHigh } = useFormikByName('loanCreaditAmountInHigh');
  const [totalCommissionAmount, setTotalCommissionAmount] = useState<number>(0);
  const personsInvolved = [
    {
      title: 'Vermittler',
      name: 'intermediary',
    },
    {
      title: 'Beteiligter Finanzierungsberater',
      name: 'commissionRecipient',
    },
    {
      title: 'Direktor',
      name: 'director',
    },
    {
      title: 'Office (Kontrolle)',
      name: 'office',
    },
  ];

  useEffect(() => {
    if (commissionRateInPercentage && loanCreaditAmountInHigh) {
      setTotalCommissionAmount(parseFloat(loanCreaditAmountInHigh) * (parseFloat(commissionRateInPercentage) / 100));
    }
  }, [commissionRateInPercentage, loanCreaditAmountInHigh]);

  return (
    <PageWrapper px={5} footer={<RBSFooter />}>
      <Flex justifyContent="space-between" mb={printMode ? 0 : 5}>
        <Box mt="auto">
          <Heading fontFamily="body" fontSize={printMode ? 'lg' : 'xl'} lineHeight={1.1}>
            Begleitschein Privatfinanzierung
          </Heading>
          <PrintableText fontWeight="bold" color="documents.primary.900">
            Leistungsnachweis für einzelne Beratungsschritte
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
          Immobiliendarlehen oder Ratenkredit
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
          <PrintableField<CurrencyFieldType>
            EditComponent={CurrencyFormikField}
            PrintComponent={CurrencyPrintField}
            key="commissionRateInPercentage"
            name="commissionRateInPercentage"
            label="Provisionssatz in %"
            variant="flushed"
            showRequiredIcon={false}
            symbol={false}
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
            key="commissionAmountinEuro"
            name="commissionAmountinEuro"
            label="Provisionshöhe in Euro"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
            value={totalCommissionAmount}
            disabled
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
            key="loanCreaditAmountInHigh"
            name="loanCreaditAmountInHigh"
            label="Darlehens- bzw. Kreditbetrag in Höhe"
            variant="flushed"
            showRequiredIcon={false}
            isRequired
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
            key="bankPartner"
            name="bankPartner"
            label="Produktanbieter bzw. Bankpartner"
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
      <Divider mb={printMode ? 2 : 4} borderColor="#E4E7EB" />
      <PrintableText mb={4} fontSize={printMode ? 'md' : 'lg'} fontWeight={500}>
        Teiler{' '}
        <Box as="span" color="documents.tertiary.500" fontSize="sm" fontWeight="normal">
          (gemäß Einheitenbewertungstabelle)
        </Box>
      </PrintableText>
      <Box px={5}>
        <PrintableField<RadioFieldType>
          EditComponent={RadioFormikField}
          PrintComponent={RadioPrintField}
          key="divider"
          name="divider"
          direction="row"
          d="grid"
          gridTemplateColumns="1fr 1fr"
          spacing={0}
          gridGap={10}
          options={[
            {
              key: '1',
              label: 'Finanzierung OHNE Finanzierungsberater - 65',
              value: '65',
            },
            {
              key: '2',
              label: 'Finanzierung MIT Finanzierungsberater - 100',
              value: '100',
            },
          ]}
          isRequired
        />
        <Grid templateColumns="1fr 1fr" gap={10}>
          <CheckboxFormikField
            name="marketFundPerUnit"
            label="10 € pro Einheit an Marketingfond"
            pb={8}
            ml={printMode ? 0 : '2px'}
          />
          <NumCommUnits name="commUnits" subscriptionFieldName="commissionAmountinEuro" billingFieldName="divider" />
        </Grid>
      </Box>
      <Divider mb={printMode ? 2 : 4} borderColor="#E4E7EB" />
      <ParticipantDetails personsInvolved={personsInvolved} />
      <PrintableText mb={3} color="documents.tertiary.500">
        * 1 = Investment Kompass, 2 = Erstberatung, 3 = Zweitberatung, 4 = Angebotserstellung, 5 = Antragsrecherche, 6=
        Nachbearbeitung
      </PrintableText>
    </PageWrapper>
  );
};
