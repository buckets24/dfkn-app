/* eslint-disable react/no-unescaped-entities */
import React, { FC, Fragment } from 'react';
import { Box, Heading, Image, Flex, Grid, Text } from '@chakra-ui/react';
import { DFKLogo } from 'src/theme/icons/DFKLogo';
import { HeadingWrapper } from '../components/HeadingWrapper';
import { PageWrapper } from '../../common/PageWrapper';
import { SalaryBenefitRentPension } from '../components/SalarayBenefitRentPension';
import { SpendingBudget } from '../components/SpendingBudget';
import { WealthConceptTable } from '../components/WealthConceptTable';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { InvestmentKompassFooter } from '../InvestmentKompassFooter';
import PositionMarker from 'src/modules/documents/document-guide/PositionMarker';
import { InvestmentKompassGuideNames } from '../guide/InvestmentKompassGuideApi';

export const Page06: FC = () => {
  const { printMode } = useDocFormMeta();
  const distributionIncome = [
    {
      accountNum: '1',
      accountType: 'Sparkonto',
      percent: '20',
      types: ['Kurzfristig', 'Mittelfristig', 'Langfristig'],
    },
    {
      accountNum: '2',
      accountType: 'Fixe Ausgaben',
      percent: '50',
      types: ['Miete,', 'Nebenkosten,', 'Strom, usw.'],
    },
    {
      accountNum: '3',
      accountType: 'Flexible Ausgaben',
      percent: '30',
      types: ['Verpflegung,', 'Restaurant,', 'Kind, Geschenke'],
    },
  ];

  return (
    <PageWrapper px={12} maxH="1202px" pl={printMode ? 8 : 12} footer={<InvestmentKompassFooter page={6} />}>
      <Box textAlign="right">
        <DFKLogo maxW="70px" color="documents.primary.600" />
      </Box>
      <PositionMarker name={InvestmentKompassGuideNames.SEITE_6_TEIL_1} />
      <HeadingWrapper mb={printMode ? 3 : 10}>
        <Heading color="documents.primary.600" fontFamily="body" as="h3" fontSize="xl" lineHeight={1}>
          DFK NORD
          <br />
          <Box as="span" color="documents.tertiary.500">
            VERMÖGENSKONZEPT
          </Box>
        </Heading>
      </HeadingWrapper>
      <Grid templateColumns="max-content 1fr">
        <Box>
          <Text mb={20} fontWeight="bold">
            Einnahmenkonto
          </Text>
          <Grid templateColumns="max-content 1fr" alignItems="center" mb={2}>
            <Image mr={2} w="32px" src="/svg/investment-kompass/euro-salary.svg" />
            <Text
              maxW="200px"
              color="documents.secondary.700"
              fontSize="lg"
              fontFamily="mono"
              fontWeight={500}
              lineHeight={1.1}
            >
              Gehalt, Kindergeld, Miete, Rente
            </Text>
          </Grid>
          <Flex alignItems="center" mt={1}>
            <SalaryBenefitRentPension />
            <Box w="70px" borderTopWidth="1px" borderColor="documents.secondary.700" borderStyle="dotted" />
          </Flex>
        </Box>
        <Box>
          <Text mb={2} fontWeight="bold">
            Einkommensverteilung
          </Text>
          <Text color="documents.secondary.700" fontFamily="mono" fontSize="sm" fontWeight={500}>
            So sollte es sein:
          </Text>
          <Box p={2} borderWidth="1px" borderColor="documents.secondary.700" borderStyle="dotted">
            <Grid templateColumns="repeat(2, 1fr)">
              {distributionIncome.map((income, i) => (
                <Fragment key={income.accountNum}>
                  <Grid
                    pr={printMode ? 3 : 10}
                    mb={1}
                    templateColumns="max-content max-content"
                    alignItems="center"
                    borderBottomWidth={i < distributionIncome.length - 1 ? '1px' : 'none'}
                    borderColor="documents.secondary.700"
                    borderStyle="dotted"
                  >
                    <Image mx={4} w="45px" src="/svg/investment-kompass/credit-card.svg" />
                    <Box>
                      <Text
                        color="documents.secondary.700"
                        fontSize={printMode ? 'md' : 'lg'}
                        fontWeight="bold"
                        lineHeight={1.1}
                      >
                        Konto {income.accountNum}
                      </Text>
                      <Text
                        color="documents.secondary.700"
                        fontSize={printMode ? 'md' : 'lg'}
                        fontWeight="bold"
                        lineHeight={1.1}
                      >
                        {income.accountType}
                      </Text>
                      <Text color="documents.tertiary.500" fontSize={printMode ? 'md' : 'lg'} fontWeight="bold">
                        {income.percent}%
                      </Text>
                    </Box>
                  </Grid>
                  <Box
                    ml="1px"
                    mb={1}
                    borderBottomWidth={i < distributionIncome.length - 1 ? '1px' : 'none'}
                    borderColor="documents.secondary.700"
                    borderStyle="dotted"
                  >
                    {income.types.map((type, i) => (
                      <Text key={i} ml={3} fontSize={printMode ? 'sm' : 'lg'}>
                        {type}
                      </Text>
                    ))}
                  </Box>
                </Fragment>
              ))}
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Box my={printMode ? 4 : 8}>
        <PositionMarker name={InvestmentKompassGuideNames.SEITE_6_TEIL_2} />
        <WealthConceptTable />
      </Box>
      <Flex alignItems="center">
        <SpendingBudget />
      </Flex>
    </PageWrapper>
  );
};
