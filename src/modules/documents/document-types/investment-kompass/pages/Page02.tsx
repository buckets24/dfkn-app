/* eslint-disable react/no-unescaped-entities */
import React, { FC } from 'react';
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { DFKLogo } from 'src/theme/icons/DFKLogo';
import { HeadingWrapper } from '../components/HeadingWrapper';
import { PageWrapper } from '../../common/PageWrapper';
import { FinancialAnalysisIcon } from '../icons/FinancialAnalysisIcon';
import { FinancialOptimizationIcon } from '../icons/FinancialOptimizationIcon';
import { WealthAccumulationIcon } from '../icons/WealthAccumulationIcon';
import { Partners } from '../components/Partners';
import { InvestmentKompassFooter } from '../InvestmentKompassFooter';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import PositionMarker from 'src/modules/documents/document-guide/PositionMarker';
import { InvestmentKompassGuideNames } from '../guide/InvestmentKompassGuideApi';

export const Page02: FC = () => {
  const { printMode } = useDocFormMeta();

  const advantages = [
    {
      icon: <FinancialAnalysisIcon w="60px" h="60px" />,
      title: 'Finanzanalyse',
      desc: 'Zunächst analysieren wir Ihre aktuelle finanzielle Situation.',
    },
    {
      icon: <FinancialOptimizationIcon w="60px" h="60px" />,
      title: 'Finanzoptimierung',
      desc: 'Dann entwickeln wir diese zu einem optimalen Ergebnis.',
    },
    {
      icon: <WealthAccumulationIcon w="60px" h="60px" />,
      title: 'Vermögensbildung',
      desc:
        'Abschließend beschäftigen wir uns mit Ihrer Vermögensbildung, denn eine reine Finanzoptimierung ist nur „die halbe Miete“',
    },
  ];

  const corporateGroup = [
    {
      count: '+15.000',
      text: 'qm Wohnfläche im Bau',
    },
    {
      count: '+3.000',
      text: 'Kunden mit sicheren Mieteinnahmen',
    },
    {
      count: '+500',
      text: 'Objekte in 2020',
    },
    {
      count: '2001',
      text: 'Gründungsjahr',
    },
    {
      count: '+500',
      text: 'Mitarbeiter',
    },
    {
      count: '+40.000',
      text: 'Familien in der Betreuung',
    },
  ];

  return (
    <PageWrapper px={12} maxH="1202px" pl={printMode ? 8 : 12} footer={<InvestmentKompassFooter page={2} />}>
      <Box textAlign="right">
        <DFKLogo maxW="70px" color="documents.primary.600" />
      </Box>

      <PositionMarker name={InvestmentKompassGuideNames.SEITE_2_TEIL_1} />
      <HeadingWrapper mb={5}>
        <Heading color="documents.primary.600" fontFamily="body" as="h3" fontSize="xl" lineHeight={1}>
          KOMPLEXE VORTEILE <br />
          <Box as="span" color="documents.tertiary.500">
            EINFACH BEKOMMEN
          </Box>
        </Heading>
      </HeadingWrapper>
      {advantages.map((advantage, i) => (
        <Grid key={i} pos="relative" templateColumns="max-content 1fr" alignItems="center" gap={2} mb={5}>
          <Flex>
            <Text pos="absolute" top={-3} mr={2} color="documents.secondary.800" fontSize="3xl" fontWeight="bold">
              {i + 1}
            </Text>
            <Box ml={8} mr={3}>
              {advantage.icon}
            </Box>
          </Flex>
          <Box maxW="270px">
            <Text fontFamily="mono" color="documents.secondary.700" fontWeight={500}>
              {advantage.title}
            </Text>
            <Text fontSize="sm">{advantage.desc}</Text>
          </Box>
        </Grid>
      ))}

      <HeadingWrapper my={10}>
        <PositionMarker name={InvestmentKompassGuideNames.SEITE_2_TEIL_2} />
        <Heading color="documents.primary.600" fontFamily="body" as="h3" fontSize="xl" lineHeight={1}>
          IMMOBILIENKAPITAL IM ZENTRUM <br />
          <Box as="span" color="documents.tertiary.500">
            UNSERER UNTERNEHMENSGRUPPE
          </Box>
        </Heading>
      </HeadingWrapper>
      <Grid templateColumns="repeat(3, 1fr)" gap={5} mb={12}>
        {corporateGroup.map((corporate) => (
          <Flex
            key={corporate.text}
            flexDir="column"
            justifyContent="center"
            p={3}
            textAlign="center"
            borderWidth="1px"
            borderColor="documents.secondary.700"
            borderStyle="dotted"
          >
            <Heading fontFamily="body" as="h4" fontSize="lg" color="documents.tertiary.500">
              {corporate.count}
            </Heading>
            <Text color="documents.secondary.700" fontFamily="mono" fontWeight={500} lineHeight={1}>
              {corporate.text}
            </Text>
          </Flex>
        ))}
      </Grid>
      <Partners />
    </PageWrapper>
  );
};
