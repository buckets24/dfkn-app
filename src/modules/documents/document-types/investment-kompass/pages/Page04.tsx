/* eslint-disable react/no-unescaped-entities */
import React, { FC } from 'react';
import { Box, Flex, Grid, Heading, Text, Image } from '@chakra-ui/react';
import { DFKLogo } from 'src/theme/icons/DFKLogo';
import { HeadingWrapper } from '../components/HeadingWrapper';
import { RadioFormikField } from 'jexity-app/form/fields/RadioField';
import { PageWrapper } from '../../common/PageWrapper';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { InvestmentKompassFooter } from '../InvestmentKompassFooter';
import { CommonChallenges } from '../components/CommonChallenges';
import PositionMarker from 'src/modules/documents/document-guide/PositionMarker';
import { InvestmentKompassGuideNames } from '../guide/InvestmentKompassGuideApi';

export const Page04: FC = () => {
  const { printMode } = useDocFormMeta();
  const goalsAndWishes = [
    {
      title: () => (
        <Heading fontFamily="body" fontSize="lg">
          Eigene <br /> Immobilie
        </Heading>
      ),
      name: 'ownProperty',
      icon: 'own-property.svg',
    },
    {
      title: () => (
        <Heading fontFamily="body" fontSize="lg">
          Sichere Zukunft <br /> für den <br />
          Nachwuchs
        </Heading>
      ),
      name: 'safeFuture',
      icon: 'secure-future.svg',
    },
    {
      title: () => (
        <Heading fontFamily="body" fontSize="lg">
          Finanzielle <br /> Unabhängigkeit
        </Heading>
      ),
      name: 'financialIndependence',
      icon: 'financial-independence.svg',
    },
    {
      title: () => (
        <Heading fontFamily="body" fontSize="lg">
          Ruhestand <br /> absichern
        </Heading>
      ),
      name: 'retirementSecure',
      icon: 'secure-retirement.svg',
    },
    {
      title: () => (
        <Heading fontFamily="body" fontSize="lg">
          Optimale <br /> Existenzsicherheit
        </Heading>
      ),
      name: 'optimalSecurity',
      icon: 'optimal-security.svg',
    },
    {
      title: () => (
        <Heading fontFamily="body" fontSize="lg">
          Sonstige <br /> Wünsche
        </Heading>
      ),
      name: 'otherWishes',
      icon: 'other-wishes.svg',
    },
  ];

  return (
    <PageWrapper px={12} maxH="1202px" pl={printMode ? 8 : 12} footer={<InvestmentKompassFooter page={4} />}>
      <Box textAlign="right">
        <DFKLogo maxW="70px" color="documents.primary.600" />
      </Box>
      <HeadingWrapper mb={10}>
        <PositionMarker name={InvestmentKompassGuideNames.SEITE_4_TEIL_1} />
        <Heading color="documents.primary.600" fontFamily="body" as="h3" fontSize="xl" lineHeight={1}>
          MEINE ZIELE
          <br />
          <Box as="span" color="documents.tertiary.500">
            UND WÜNSCHE
          </Box>
        </Heading>
      </HeadingWrapper>
      <Grid templateColumns="repeat(2, 1fr)" gap={10}>
        {goalsAndWishes.map((goal, i) => {
          const Title = goal.title;

          return (
            <Box key={i} mb={5}>
              <Flex justifyContent="space-between" mb={5}>
                <Box minH="90px">
                  <Title />
                </Box>
                <Image maxW="100px" maxH="95px" src={`/svg/investment-kompass/${goal.icon}`} />
              </Flex>
              <Box pos="relative">
                <RadioFormikField
                  pos="relative"
                  zIndex={1}
                  justifyContent="center"
                  spacing={3}
                  variant="dotted"
                  key={goal.name}
                  name={goal.name}
                  direction="row"
                  options={[
                    { key: '1', label: '1', value: '1' },
                    { key: '2', label: '2', value: '2' },
                    { key: '3', label: '3', value: '3' },
                    { key: '4', label: '4', value: '4' },
                    { key: '5', label: '5', value: '5' },
                    { key: '6', label: '6', value: '6' },
                    { key: '7', label: '7', value: '7' },
                  ]}
                  dottedShowLabel={false}
                  isRequired
                />
                <Box
                  pos="absolute"
                  top={3}
                  left="50%"
                  w="250px"
                  borderBottomWidth="2px"
                  borderColor="documents.secondary.300"
                  transform="translate(-50%, -50%)"
                />
                <Flex mt={2} justifyContent="space-between" textAlign="center">
                  <Text ml={3} color="documents.secondary.700" fontWeight={400} lineHeight={1}>
                    weniger <br />
                    wichtig
                  </Text>
                  <Text mr={5} color="documents.secondary.700" fontWeight={400} lineHeight={1}>
                    sehr <br />
                    wichtig
                  </Text>
                </Flex>
              </Box>
            </Box>
          );
        })}
      </Grid>
      <Heading fontFamily="body" fontSize="lg" mt={printMode ? 0 : 6}>
        <PositionMarker name={InvestmentKompassGuideNames.SEITE_4_TEIL_2} />
        Häufige Herausforderungen
      </Heading>
      <CommonChallenges />
    </PageWrapper>
  );
};
