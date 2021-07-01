/* eslint-disable react/no-unescaped-entities */
import { Box, Flex, Grid, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import React, { FC } from 'react';
import PositionMarker from 'src/modules/documents/document-guide/PositionMarker';
import { PageWrapper } from '../../common/PageWrapper';
import { InvestmentKompassGuideNames } from '../guide/InvestmentKompassGuideApi';
import { ChevronIcon } from '../icons/ChevronIcon';
import { DFKLogo } from '../icons/DFKLogo';

export const Page01: FC = () => {
  const list = [
    'Vermögensbildung',
    'Finanzberatung & Budgetoptimierung',
    'Immobilien & Finanzierung',
    'Vermietung & Verwaltung',
  ];

  return (
    <PageWrapper
      px={0}
      h="100vh"
      maxH="1202px"
      footer={
        <Box px={12} pb={12}>
          <DFKLogo w="150px" color="documents.primary.600" />
        </Box>
      }
    >
      <Box
        pos="relative"
        p={12}
        w="100%"
        h="100%"
        minH="100%"
        bg="url('/images/map-bg.png')"
        backgroundPosition="bottom"
        backgroundRepeat="no-repeat"
      >
        <PositionMarker name={InvestmentKompassGuideNames.SEITE_1} />
        <Box>
          <Heading fontFamily="body" as="h2" mt="120px" mb={16} fontSize="3xl" lineHeight={1}>
            <Box as="span" color="documents.tertiary.500">
              INVESTMENT-KOMPASS
            </Box>
            <br />
            <Box as="span" color="documents.secondary.700" textTransform="uppercase">
              MEIN FAHRPLAN IN EINE SORGENFREIE ZUKUNFT
            </Box>
          </Heading>
          <UnorderedList mx={0} listStyleType="none">
            {list.map((item, i) => (
              <ListItem key={i} d="flex" mb={4}>
                <ChevronIcon mt={1} mr={5} w="22px" h="22px" color="documents.secondary.700" />
                <Text color="documents.secondary.300" fontSize="lg" fontWeight={500}>
                  {item}
                </Text>
              </ListItem>
            ))}
          </UnorderedList>
        </Box>
      </Box>
    </PageWrapper>
  );
};
