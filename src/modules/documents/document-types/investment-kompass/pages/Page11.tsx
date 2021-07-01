/* eslint-disable react/no-unescaped-entities */
import { Box, Heading, Text, Link, Flex, Image } from '@chakra-ui/react';
import React, { FC } from 'react';
import { PageWrapper } from '../../common/PageWrapper';
import { DFKLogo } from 'src/theme/icons/DFKLogo';
import { InvestmentKompassFooter } from '../InvestmentKompassFooter';
import PositionMarker from 'src/modules/documents/document-guide/PositionMarker';
import { InvestmentKompassGuideNames } from '../guide/InvestmentKompassGuideApi';

export const Page11: FC = () => {
  const companyPhone = '+49 4106 6380 310';
  const companyEmail = 'info@dfknord.de';
  const companyURL = 'https://dfknord.de/';
  return (
    <PageWrapper maxH="1202px" footer={<InvestmentKompassFooter pl={12} />}>
      <Box pr={12} textAlign="right">
        <DFKLogo maxW="70px" color="documents.primary.600" />
      </Box>
      <Box
        pos="relative"
        p={12}
        w="100%"
        h="100%"
        bg="url('/images/map-bg.png')"
        backgroundPosition="bottom"
        backgroundRepeat="no-repeat"
      >
        <PositionMarker name={InvestmentKompassGuideNames.ZUM_SCHLUSS} />
        <Box mt={20} textAlign="center" fontFamily="mono" fontSize="lg" fontWeight={400}>
          <Box mb={10} color="documents.secondary.700">
            <Heading fontFamily="body" as="h4" fontSize="xl" fontWeight={500}>
              LEISTUNGEN
            </Heading>
            <Box mx="auto" my={3} w="8px" borderBottomWidth="2px" borderColor="documents.secondary.700" />
            <Text>Immobilien</Text>
            <Text>Finanzierung</Text>
            <Text>Vermietung</Text>
          </Box>
          <Box mb={5} color="documents.secondary.700">
            <Heading fontFamily="body" as="h4" fontSize="xl" fontWeight={500}>
              KONTAKT
            </Heading>
            <Box mx="auto" my={3} w="8px" borderBottomWidth="2px" borderColor="documents.secondary.700" />
            <Text>DFK NORD AG</Text>
            <Text>Kieler Str. 97a</Text>
            <Text>25451 Quickborn</Text>
            <Text>
              Tel.:{' '}
              <Link href={`tel:${companyPhone}`} _hover={{ textDecor: 'none', color: 'documents.tertiary.500' }}>
                {companyPhone}
              </Link>
            </Text>
            <Text>
              E-Mail:{' '}
              <Link href={`mailto:${companyEmail}`} _hover={{ textDecor: 'none', color: 'documents.tertiary.500' }}>
                {companyEmail}
              </Link>
            </Text>
          </Box>
          <Link
            href={companyURL}
            target="_blank"
            color="black"
            fontFamily="mono"
            fontSize="lg"
            fontWeight={500}
            _hover={{ textDecor: 'none', color: 'documents.tertiary.500' }}
          >
            www.dfknord.de
          </Link>
        </Box>
        <Flex mt="160px" flexDir="column" alignItems="center">
          <Image maxW="150px" src="/images/investment-kompass-document/qrcode.jpg" />
          <Text
            mt={5}
            color="documents.secondary.700"
            fontFamily="mono"
            fontSize="lg"
            fontWeight={500}
            lineHeight={1.1}
            textAlign="center"
          >
            <Link
              href="https://g.page/dfknord/review?nr"
              isExternal
              _hover={{
                textDecor: 'none',
                color: 'documents.tertiary.500',
              }}
            >
              Google Bewertung <br />
              Zufrieden mit der Beratung? <br />
              Sagen Sie es den Anderen :)
            </Link>
          </Text>
        </Flex>
      </Box>
    </PageWrapper>
  );
};
