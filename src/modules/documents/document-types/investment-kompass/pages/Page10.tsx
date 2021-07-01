/* eslint-disable react/no-unescaped-entities */
import React, { FC } from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { DFKLogo } from 'src/theme/icons/DFKLogo';
import { HeadingWrapper } from '../components/HeadingWrapper';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { PageWrapper } from '../../common/PageWrapper';
import { CheckboxFormikField } from 'jexity-app/form/fields/CheckboxField';
import { QuotedText } from '../components/QuotedText';
import { InvestmentKompassFooter } from '../InvestmentKompassFooter';

export const Page10: FC = () => {
  const { printMode } = useDocFormMeta();
  const requiredDocuments = [
    {
      title: 'Ihre Einnahmen',
      checkList: [
        {
          label: 'Ausweiskopien (Vor- und Rückseite)',
          name: 'IDcopies',
        },
        {
          label: 'Gehaltsabrechnungen von beiden Ehepartnern',
          name: 'spousesPaySlips',
        },
        {
          label: 'Zusätzliche Nebeneinkünfte (Nebenjob, Miete, Pflegegeld usw.)',
          name: 'additionalIncome',
        },
        {
          label: 'Renteninfo',
          name: 'pensionInfo',
        },
      ],
    },
    {
      title: 'Ihre Sparanlagen / Ihr Vermögen',
      checkList: [
        {
          label: 'Bausparverträge',
          name: 'requiredHomeLoanSavings',
        },
        {
          label: 'Lebens- bzw. Rentenversicherungen',
          name: 'lifePensionInsurance',
        },
        {
          label: 'Wertpapiere',
          name: 'requiredSecurities',
        },
        {
          label: 'Sonstige Verträge',
          name: 'otherContracts',
        },
      ],
    },
    {
      title: 'Ihre Ausgaben ',
      checkList: [
        {
          label: 'Mtl. Miete bzw. Immobiliendarlehen',
          name: 'monthlyRentLoan',
        },
        {
          label: 'Kreditverträge (KFZ, Leasing, ... )',
          name: 'loanAgreement',
        },
        {
          label: 'Sachversicherungen (PHV, Hausrat, Wohngebäude, ... )',
          name: 'propertyInsurance',
        },
        {
          label: 'Personenversicherungen (Krankenversicherung, Berufsunfähigkeit, ... )',
          name: 'personalInsurance',
        },
        {
          label: 'Haushaltskosten (Strom, Gas, Telekommunikation)',
          name: 'householdCosts',
        },
        {
          label: 'Vereinsbeiträge (Fitness, ...)',
          name: 'clubFees',
        },
        {
          label: 'Kontoauszüge der letzten 3 Monate',
          name: 'bankStatementLast3Months',
        },
      ],
    },
    {
      title: 'Zusätzliche Unterlagen von Selbstständigen',
      checkList: [
        {
          label: 'Aktuelle BWA',
          name: 'currentBWA',
        },
        {
          label: 'Letzter Steuerbescheid',
          name: 'lastTaxAssessment',
        },
        {
          label: 'Mietverträge',
          name: 'rentalAgreements',
        },
      ],
    },
  ];

  return (
    <PageWrapper px={12} maxH="1202px" pl={printMode ? 8 : 12} footer={<InvestmentKompassFooter page={10} />}>
      <Box textAlign="right">
        <DFKLogo maxW="70px" color="documents.primary.600" />
      </Box>
      <HeadingWrapper mb={printMode ? 5 : 10}>
        <Heading color="documents.primary.600" fontFamily="body" as="h3" fontSize="xl" lineHeight={1}>
          BENÖTIGTE UNTERLAGEN ZUM
          <br />
          <Box as="span" color="documents.tertiary.500">
            INVESTMENT-KOMPASS BEI ANGESTELLTEN
          </Box>
        </Heading>
      </HeadingWrapper>
      {requiredDocuments.map((document, i) => (
        <Box key={i} mb={printMode ? 5 : 12}>
          <Text mb={printMode ? 3 : 5} color="documents.secondary.700" fontFamily="mono" fontWeight={500}>
            {document.title}
          </Text>
          {document.checkList.map((item, i) => (
            <CheckboxFormikField mb={2} key={i} name={item.name} label={item.label} />
          ))}
        </Box>
      ))}
      <Flex justifyContent="flex-end">
        <QuotedText
          maxW="348px"
          quote="Es gibt zwei Möglichkeiten das Leben zu bestreiten. Entweder Sie arbeiten für Ihr Geld, oder Ihr Geld arbeitet für Sie. Sie haben die Wahl!"
        />
      </Flex>
    </PageWrapper>
  );
};
