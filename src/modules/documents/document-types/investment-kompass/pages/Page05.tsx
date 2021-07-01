/* eslint-disable react/no-unescaped-entities */
import { Box, Flex, Grid, Heading, Image, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import PositionMarker from 'src/modules/documents/document-guide/PositionMarker';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { DFKLogo } from 'src/theme/icons/DFKLogo';
import { PageWrapper } from '../../common/PageWrapper';
import { HeadingWrapper } from '../components/HeadingWrapper';
import { InvestmentKompassGuideNames } from '../guide/InvestmentKompassGuideApi';
import { InvestmentKompassFooter } from '../InvestmentKompassFooter';

export const Page05: FC = () => {
  const { printMode } = useDocFormMeta();
  const contributions = [
    {
      title: 'Martin',
      equity: '8.500',
      monthlyInvestment: '82',
      graph: 'martin-graph.svg',
      details: ['Investiert in eine', 'vermietete Immobilie'],
    },
    {
      title: 'Siewert',
      subtitle: 'Familie',
      equity: '16.000',
      monthlyInvestment: '271',
      graph: 'siewert-graph.svg',
      details: ['Investiert alle 5 Jahre in eine', 'Neubauimmobilie (Insgesamt 4)'],
    },
  ];

  return (
    <PageWrapper px={12} maxH="1202px" pl={printMode ? 8 : 12} footer={<InvestmentKompassFooter page={5} />}>
      <Box>
        <Box textAlign="right">
          <DFKLogo maxW="70px" color="documents.primary.600" />
        </Box>
        <PositionMarker name={InvestmentKompassGuideNames.SEITE_5_TEIL_1} />
        <HeadingWrapper mb={5}>
          <Heading color="documents.primary.600" fontFamily="body" as="h3" fontSize="xl" lineHeight={1}>
            MIT KLEINEN BEITRÄGEN <br />
            <Box as="span" color="documents.tertiary.500">
              ZUM IMMOBILIENVERMÖGEN
            </Box>
          </Heading>
        </HeadingWrapper>
        {contributions.map((contribution, i) => (
          <Box mb={printMode ? 8 : 20} key={i}>
            <Flex mb={5} ml="74px">
              <Flex
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                px={10}
                bg="documents.secondary.700"
                color="white"
                borderRadius="4px"
              >
                <Text fontFamily="mono" fontWeight={500} lineHeight={1.1}>
                  {contribution.title}
                </Text>
                {contribution.subtitle && (
                  <>
                    <Text fontSize="sm" lineHeight={1.1}>
                      {contribution.subtitle}
                    </Text>
                  </>
                )}
              </Flex>
              <Grid
                templateColumns="max-content 1fr"
                ml={2}
                px={4}
                py={1}
                w="100%"
                maxW={printMode ? '460px' : '510px'}
                bg="#F6F6F8"
                borderWidth="1px"
                borderColor="documents.secondary.700"
                borderRadius="4px"
              >
                <Box
                  textAlign="right"
                  mr="auto"
                  pr={2}
                  borderRightWidth="2px"
                  borderStyle="dotted"
                  borderColor="documents.secondary.800"
                >
                  <Text lineHeight={1.1}>
                    Eigenkapital:{' '}
                    <Box as="span" color="documents.secondary.700" fontFamily="mono" fontWeight={500}>
                      {contribution.equity} €
                    </Box>
                  </Text>
                  <Text lineHeight={1.1}>
                    Mtl. Investition:{' '}
                    <Box as="span" color="documents.secondary.700" fontFamily="mono" fontWeight={500}>
                      {contribution.monthlyInvestment} €
                    </Box>
                  </Text>
                </Box>
                <Box ml={2}>
                  {contribution.details.map((detail, x) => (
                    <Text key={x} lineHeight={1.1}>
                      {detail}
                    </Text>
                  ))}
                </Box>
              </Grid>
            </Flex>
            <Image mb={printMode ? 5 : 10} src={`/svg/investment-kompass/${contribution.graph}`} w="100%" />
          </Box>
        ))}
        <Box>
          <PositionMarker name={InvestmentKompassGuideNames.SEITE_5_TEIL_2} />
          <Box px={5} py={3} bg="#E5EAF0">
            <Image src="/svg/investment-kompass/budget-graph.svg" />
          </Box>
        </Box>
      </Box>
    </PageWrapper>
  );
};
