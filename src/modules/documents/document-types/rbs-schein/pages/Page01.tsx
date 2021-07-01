/* eslint-disable react/no-unescaped-entities */
import React, { FC, useEffect, useState } from 'react';
import { Box, Divider, Flex, Grid, Heading } from '@chakra-ui/react';
import { StringFieldType, StringFormikField, StringPrintField } from 'jexity-app/form/fields/StringField';
import { FormGridLayout } from 'jexity-app/form/FormGridLayout';
import { RadioFieldType, RadioFormikField, RadioPrintField } from 'jexity-app/form/fields/RadioField';
import { PrintableField } from 'src/modules/documents/PrintableField';
import { PrintableText } from 'src/modules/documents/PrintableText';
import { PageWrapper } from '../../common/PageWrapper';
import { DocumentHeader } from '../../common/DocumentHeader';
import { RBSScheinFooter } from '../RBSScheinFooter';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { DateFieldType, DateFormikField } from 'jexity-app/form/fields/DateField';
import { FlushedDatePrintField } from '../../common/FlushedDatePrintField';
import { CurrencyFieldType, CurrencyFormikField, CurrencyPrintField } from 'jexity-app/form/fields/CurrencyField';
import { CheckboxFormikField } from 'jexity-app/form/fields/CheckboxField';
import { useFormikByName } from 'jexity-app/form/useFormikByName';
import { ParticipantDetails } from '../../common/ParticipantDetails';
import { SelectFieldType, SelectFormikField } from 'jexity-app/form/fields/SelectField';
import { SelectFormFieldOption } from 'jexity-app/form/fields/fieldApi';
import {
  agioPercentCompleteOptions,
  agioPercentWithoutZeroOptions,
  oneTimeInvestmentAgio,
  paymentPeriodMultiplier,
  PaymentPeriodMultiplierType,
  personsInvolved,
  proportionalDivider,
  subscriptionMultiplier,
} from '../api';

export const Page01: FC = () => {
  const { printMode } = useDocFormMeta();
  const { value: proportionalInvestment, setFieldValue } = useFormikByName('proportionalInvestment');
  const { value: oneTimeInvestment } = useFormikByName('oneTimeInvestment');
  const { value: rateableSubscriptionAmount } = useFormikByName('rateableSubscriptionAmount');
  const { value: premiumPayments } = useFormikByName('premiumPayments');
  const { value: singleSubscriptionAmount } = useFormikByName('singleSubscriptionAmount');
  const { value: agio } = useFormikByName('agio');
  const { value: contribution } = useFormikByName('contribution');
  const { value: agioPercent } = useFormikByName('agioPercent');
  const { value: paymentPeriod } = useFormikByName('paymentPeriod');
  const { value: rateablePaymentMethod } = useFormikByName('rateablePaymentMethod');
  const [totalCommUnits, setTotalCommUnits] = useState<number>(0);
  const maxMonthlyAmountForZeroAgio = 500;
  const payPeriodMethod: keyof PaymentPeriodMultiplierType = rateablePaymentMethod;
  const [agioPercentOptions, setAgioPercentOptions] = useState<SelectFormFieldOption[]>(agioPercentCompleteOptions);
  const [disablePremiumPayments, setDisablePremiumPayments] = useState<boolean>(false);

  useEffect(() => {
    let proportional = 0;
    let oneTimeInvestment = 0;

    if (agioPercent === '0') {
      setFieldValue?.('premiumPayments', '1000');
      setDisablePremiumPayments(true);
    } else {
      setDisablePremiumPayments(false);
    }
    if (rateableSubscriptionAmount && premiumPayments && agioPercent) {
      proportional =
        parseFloat(rateableSubscriptionAmount) / parseFloat(proportionalDivider[premiumPayments][agioPercent]);
    }

    if (singleSubscriptionAmount && agio) {
      oneTimeInvestment = parseFloat(singleSubscriptionAmount) / parseFloat(oneTimeInvestmentAgio[agio]);
    }

    setTotalCommUnits(proportional + oneTimeInvestment);
  }, [rateableSubscriptionAmount, premiumPayments, singleSubscriptionAmount, agio, agioPercent, setFieldValue]);

  useEffect(() => {
    if (!rateablePaymentMethod) {
      setFieldValue?.('rateablePaymentMethod', 'monthly');
    }
  }, [rateablePaymentMethod, setFieldValue]);

  useEffect(() => {
    if (paymentPeriod <= 10 && contribution >= maxMonthlyAmountForZeroAgio * paymentPeriodMultiplier[payPeriodMethod]) {
      if (!agioPercent) {
        setFieldValue?.('agioPercent', '5');
      }

      setAgioPercentOptions(agioPercentCompleteOptions);
    } else {
      if (!agioPercent || agioPercent === '0') {
        setFieldValue?.('agioPercent', '5');
      }

      setAgioPercentOptions(agioPercentWithoutZeroOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contribution, rateablePaymentMethod, paymentPeriod, setFieldValue]);

  useEffect(() => {
    if (paymentPeriod && contribution && rateablePaymentMethod) {
      setFieldValue?.(
        'rateableSubscriptionAmount',
        contribution * paymentPeriod * subscriptionMultiplier[payPeriodMethod]
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentPeriod, contribution, rateablePaymentMethod, setFieldValue]);

  useEffect(() => {
    if (!proportionalInvestment) {
      setFieldValue?.('rateableBegin', '');
      setFieldValue?.('paymentPeriod', '');
      setFieldValue?.('contribution', '');
      setFieldValue?.('agioPercent', '');
      setFieldValue?.('rateableSubscriptionAmount', '');
      setFieldValue?.('rateablePaymentMethod', '');
      setFieldValue?.('premiumPayments', '');
    }
  }, [proportionalInvestment, setFieldValue]);

  useEffect(() => {
    if (!oneTimeInvestment) {
      setFieldValue?.('singleBegin', '');
      setFieldValue?.('singleSubscriptionAmount', '');
      setFieldValue?.('singlePaymentMethod', '');
      setFieldValue?.('numberOfInstallments', '');
      setFieldValue?.('agio', '');
    }
  }, [oneTimeInvestment, setFieldValue]);

  return (
    <PageWrapper px={5} footer={<RBSScheinFooter />}>
      <DocumentHeader />
      <Box mt={printMode ? 0 : 10} fontWeight="bold" textAlign="center">
        <Heading fontFamily="body" fontSize={printMode ? 'lg' : 'xl'} lineHeight={1.1}>
          BERATUNGSCHRONOLOGIE für Anleihe S.A.
        </Heading>
        <PrintableText fontWeight="bold">Leistungsnachweis für einzelne Beratungsschritte</PrintableText>
      </Box>
      <Divider my={printMode ? 2 : 4} borderColor="#E4E7EB" />
      <Flex maxW="50%">
        <PrintableText fontWeight="bold" mr={5}>
          Antragssteller (Zeichner)
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
          [
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
              label="Telefon/Fax"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
            />,
          ],
        ]}
      />
      <Divider my={printMode ? 2 : 4} borderColor="#E4E7EB" />
      <PrintableText fontWeight="bold" mb={printMode ? 2 : 5}>
        Vertragsdaten
      </PrintableText>
      <Grid templateColumns="1fr 1fr" gap={10}>
        <CheckboxFormikField
          name="proportionalInvestment"
          label="Ratierliche Anlage"
          pb={3}
          ml={printMode ? 0 : '2px'}
        />
        <CheckboxFormikField name="oneTimeInvestment" label="Einmalanlage" pb={3} ml={printMode ? 0 : '2px'} />
      </Grid>
      <Grid templateColumns="1fr min-content 1fr" gap={5}>
        <Box>
          <FormGridLayout
            columns={2}
            spacingX={5}
            fields={[
              <PrintableField<StringFieldType>
                EditComponent={StringFormikField}
                PrintComponent={StringPrintField}
                key="rateableBegin"
                name="rateableBegin"
                label="Beginn (TT.MM.JJJJ)"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
                disabled={!proportionalInvestment}
              />,
              <PrintableField<CurrencyFieldType>
                EditComponent={CurrencyFormikField}
                PrintComponent={CurrencyPrintField}
                key="paymentPeriod"
                name="paymentPeriod"
                label="Einzahlungsdauer (Jahre)"
                variant="flushed"
                showRequiredIcon={false}
                symbol={false}
                isRequired
                disabled={!proportionalInvestment}
                max={agioPercent === '0' ? 10 : undefined}
              />,
              <PrintableField<CurrencyFieldType>
                EditComponent={CurrencyFormikField}
                PrintComponent={CurrencyPrintField}
                key="contribution"
                name="contribution"
                label="Beitrag €"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
                disabled={!proportionalInvestment}
                onBlur={() => {
                  setFieldValue?.('contribution', Math.round(contribution / 10) * 10);
                }}
              />,
              <PrintableText key="rentalFeeLabel">
                *{' '}
                <Box as="span" fontWeight={500}>
                  ab 500€
                </Box>
                /Monat ohne Agio, EH Berechnung auf max. 10 Jahre
              </PrintableText>,
              <PrintableField<CurrencyFieldType>
                EditComponent={CurrencyFormikField}
                PrintComponent={CurrencyPrintField}
                key="rateableSubscriptionAmount"
                name="rateableSubscriptionAmount"
                label="Zeichnungssumme"
                variant="flushed"
                showRequiredIcon={false}
                isRequired
                disabled
              />,
              <PrintableField<SelectFieldType>
                EditComponent={SelectFormikField}
                PrintComponent={StringPrintField}
                variant="flushed"
                key="agioPercent"
                name="agioPercent"
                label={printMode ? 'Agio in %' : ''}
                options={agioPercentOptions}
                errorMessageSpacer={false}
                disabled={!proportionalInvestment}
              />,
            ]}
          />
          <Box mt={printMode ? 2 : 0} mb={3}>
            <PrintableText mb={2}>Zahlungsweise: </PrintableText>
            <PrintableField<RadioFieldType>
              EditComponent={RadioFormikField}
              PrintComponent={RadioPrintField}
              key="rateablePaymentMethod"
              name="rateablePaymentMethod"
              direction="row"
              fontSize="sm"
              disabled={!proportionalInvestment}
              options={[
                {
                  key: '1',
                  label: 'Monatlich',
                  value: 'monthly', // 12
                },
                {
                  key: '2',
                  label: 'Vierteljährlich',
                  value: 'quarterly', // 4
                },
                {
                  key: '3',
                  label: 'Halbjährlich',
                  value: 'half-yearly', // 6
                },
                {
                  key: '4',
                  label: 'Jährlich',
                  value: 'yearly', // 1
                },
              ]}
              isRequired
            />
          </Box>
          <Box>
            <PrintableText mb={2}>Provisionsregelung bei ratierlicher Agiozahlung</PrintableText>
            <Grid templateColumns="1fr">
              <PrintableField<RadioFieldType>
                EditComponent={RadioFormikField}
                PrintComponent={RadioPrintField}
                key="premiumPayments"
                name="premiumPayments"
                disabled={!proportionalInvestment}
                isReadOnly={disablePremiumPayments}
                errorMessageSpacer={false}
                direction="row"
                fontSize="sm"
                options={[
                  {
                    key: '1',
                    label: 'Reguläre',
                    value: '1000',
                  },
                  {
                    key: '2',
                    label: 'Ratierliche 50/50% Verrechnung',
                    value: '1200',
                  },
                  {
                    key: '3',
                    label: 'Ratierliche 100% Verrechnung',
                    value: '1100',
                  },
                ]}
                isRequired
              />
            </Grid>
          </Box>
        </Box>

        <Box w="2px" borderWidth="1px" borderColor="documents.primary.200" />

        <Grid templateColumns="1fr 1fr" gap={4}>
          <Flex flexDir="column" h="100%">
            <PrintableField<StringFieldType>
              EditComponent={StringFormikField}
              PrintComponent={StringPrintField}
              key="singleBegin"
              name="singleBegin"
              label="Beginn (TT.MM.JJJJ)"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
              disabled={!oneTimeInvestment}
            />
            <PrintableField<CurrencyFieldType>
              EditComponent={CurrencyFormikField}
              PrintComponent={CurrencyPrintField}
              key="singleSubscriptionAmount"
              name="singleSubscriptionAmount"
              label="Anlagesumme / Zeichnungssumme"
              variant="flushed"
              showRequiredIcon={false}
              isRequired
              disabled={!oneTimeInvestment}
              onBlur={() => {
                setFieldValue?.('singleSubscriptionAmount', Math.round(singleSubscriptionAmount / 10) * 10);
              }}
            />
            <Box mt={printMode ? 3 : 0}>
              <PrintableText>Einzahlungsart:</PrintableText>
              <Box>
                <PrintableField<RadioFieldType>
                  EditComponent={RadioFormikField}
                  PrintComponent={RadioPrintField}
                  key="singlePaymentMethod"
                  name="singlePaymentMethod"
                  direction="row"
                  disabled={!oneTimeInvestment}
                  options={[
                    {
                      key: '1',
                      label: 'Einmalig',
                      value: 'unique',
                    },
                    {
                      key: '2',
                      label: 'Ratierlich',
                      value: 'advisable%',
                    },
                  ]}
                  isRequired
                />
              </Box>
            </Box>
            <PrintableField<CurrencyFieldType>
              EditComponent={CurrencyFormikField}
              PrintComponent={CurrencyPrintField}
              key="numberOfInstallments"
              name="numberOfInstallments"
              label="Anzahl der Raten"
              variant="flushed"
              showRequiredIcon={false}
              symbol={false}
              isRequired
              disabled={!proportionalInvestment}
            />
          </Flex>
          <Box>
            <PrintableField<SelectFieldType>
              EditComponent={SelectFormikField}
              PrintComponent={StringPrintField}
              variant="flushed"
              key="agio"
              name="agio"
              label={printMode ? 'Agio in %' : ''}
              options={[
                {
                  type: 'formStringOption',
                  key: '1',
                  value: '0',
                  label: 'Agio 0%',
                },
                {
                  type: 'formStringOption',
                  key: '2',
                  value: '1',
                  label: 'Agio 1%',
                },
                {
                  type: 'formStringOption',
                  key: '3',
                  value: '2',
                  label: 'Agio 2%',
                },
                {
                  type: 'formStringOption',
                  key: '4',
                  value: '3',
                  label: 'Agio 3%',
                },
                {
                  type: 'formStringOption',
                  key: '5',
                  value: '4',
                  label: 'Agio 4%',
                },
                {
                  type: 'formStringOption',
                  key: '6',
                  value: '5',
                  label: 'Agio 5%',
                },
              ]}
              disabled={!oneTimeInvestment}
            />
            <PrintableField<CurrencyFieldType>
              EditComponent={CurrencyFormikField}
              PrintComponent={CurrencyPrintField}
              key="oneTimeInvestmentDivider"
              name="oneTimeInvestmentDivider"
              label="Einmalanlage Teiler"
              variant="flushed"
              value={agio ? oneTimeInvestmentAgio[agio] : ''}
              showRequiredIcon={false}
              symbol={false}
              disabled
            />
          </Box>
        </Grid>
      </Grid>
      <Grid templateColumns="1fr 1fr 1fr" gap={5} mt={2}>
        <PrintableField<CurrencyFieldType>
          EditComponent={CurrencyFormikField}
          PrintComponent={CurrencyPrintField}
          key="proportionalDivider"
          name="proportionalDivider"
          label="Ratierliche Anlage Teiler"
          variant="flushed"
          value={premiumPayments ? proportionalDivider[premiumPayments][agioPercent] : ''}
          showRequiredIcon={false}
          symbol={false}
          disabled
          maxW="167.8px"
        />
        <Flex flexDir="column" justifyContent="center" alignItems="center">
          <PrintableField<CurrencyFieldType>
            EditComponent={CurrencyFormikField}
            PrintComponent={CurrencyPrintField}
            key="totalNumCommUnits"
            name="totalNumCommUnits"
            label="Einheiten"
            variant="flushed"
            value={totalCommUnits ? Math.round(totalCommUnits * 1000) / 1000 : ''}
            showRequiredIcon={false}
            symbol={false}
            disabled
            errorMessageSpacer={false}
            pb={2}
            maxW={printMode ? '170px' : '100%'}
            w="100%"
          />
          <CheckboxFormikField name="marketingFond" label="10€ p. EH an Marketingfond" />
        </Flex>
      </Grid>
      <Divider my={printMode ? 2 : 4} borderColor="#E4E7EB" />
      <PrintableText mt={printMode ? 1 : 3} fontWeight="bold" textAlign="center">
        Bei Vertragsabschluss und Prüfung mitwirkende Personen
      </PrintableText>
      <PrintableField<StringFieldType>
        mb={printMode ? 3 : 0}
        EditComponent={StringFormikField}
        PrintComponent={StringPrintField}
        key="comment"
        name="comment"
        label="Bemerkung"
        variant="flushed"
        showRequiredIcon={false}
        isRequired
      />
      <ParticipantDetails personsInvolved={personsInvolved} />
      <PrintableText mb={3} color="documents.tertiary.500">
        * 1 = Investment Kompass, 2 = Erstberatung, 3 = Zweitberatung, 4 = Angebotserstellung, 5 = Antragsrecherche, 6=
        Nachbearbeitung
      </PrintableText>
    </PageWrapper>
  );
};
