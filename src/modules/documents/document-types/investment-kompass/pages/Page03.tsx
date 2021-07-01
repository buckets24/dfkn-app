/* eslint-disable react/no-unescaped-entities */
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { StringFormikField } from 'jexity-app/form/fields/StringField';
import React, { FC } from 'react';
import PositionMarker from 'src/modules/documents/document-guide/PositionMarker';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { DFKLogo } from 'src/theme/icons/DFKLogo';
import { IncomePieChart } from 'src/theme/icons/IncomePieChart';
import { PageWrapper } from '../../common/PageWrapper';
import { HeadingWrapper } from '../components/HeadingWrapper';
import { IncomeConcept } from '../components/IncomeConcept';
import { PensionOutput } from '../components/PensionOutput';
import { InvestmentKompassGuideNames } from '../guide/InvestmentKompassGuideApi';
import { InvestmentKompassFooter } from '../InvestmentKompassFooter';

export const Page03: FC = () => {
  const { printMode } = useDocFormMeta();

  return (
    <PageWrapper px={12} maxH="1202px" pl={printMode ? 8 : 12} footer={<InvestmentKompassFooter page={3} />}>
      <Box>
        <Box textAlign="right">
          <DFKLogo maxW="70px" color="documents.primary.600" />
        </Box>
        <PositionMarker name={InvestmentKompassGuideNames.SEITE_3_TEIL_1} />
        <HeadingWrapper mb={10}>
          <Heading color="documents.primary.600" fontFamily="body" as="h3" fontSize="xl" lineHeight={1}>
            MEIN MEHR <br />
            <Box as="span" color="documents.tertiary.500">
              FREIHEIT-, VERMÖGEN-, EINKOMMEN-
            </Box>
            <br />
            KONZEPT
          </Heading>
        </HeadingWrapper>
        <IncomeConcept />
        <Text mt={3} color="blue.50" fontFamily="mono" fontWeight={500} fontSize="lg">
          Steigern Sie Ihre Lebensqualität!
        </Text>
        <Flex alignItems="center" my={printMode ? 3 : 10} maxW="550px" color="documents.secondary.700">
          <Box pos="relative">
            <StringFormikField
              maxW="150px"
              variant="dotted"
              key="grossSalary"
              name="grossSalary"
              label="Bruttogehalt"
              showRequiredIcon={false}
              isRequired
            />
            <Box pos="absolute" top="38px" left="100px" bg="white" fontWeight="bold">
              / 100
            </Box>
          </Box>
          <Text mt={printMode ? 3 : 6} mx={3} fontWeight="bold">
            x
          </Text>
          <StringFormikField
            maxW="150px"
            variant="dotted"
            key="workingYears"
            name="workingYears"
            label="Arbeitsjahre"
            showRequiredIcon={false}
            isRequired
          />
          <Text mt={printMode ? 3 : 6} mx={3} fontWeight="bold">
            =
          </Text>
          <PensionOutput />
        </Flex>
        <Text mb={printMode ? 10 : 0} fontSize={printMode ? 'sm' : 'md'} fontWeight={500}>
          “Bei der Berechnung der Rentenhöhe blieb die jeweilige Beitragsbemessungsgrenze unberücksichtigt. Sollte das
          Bruttogehalt über der aktuellen Beitragsbemessungsgrenze liegen, fällt die zu erwartende Rente ggfs. deutlich
          niedriger aus. Die Rentenlücke würde somit sogar noch steigen!”
        </Text>

        <HeadingWrapper mt={printMode ? 0 : 20} mb={20}>
          <PositionMarker name={InvestmentKompassGuideNames.SEITE_3_TEIL_2} />
          <Heading color="documents.primary.600" fontFamily="body" as="h3" fontSize="xl" lineHeight={1}>
            DIE OPTIMIERUNG MEINER <br />
            <Box as="span" color="documents.tertiary.500">
              MTL. AUSGABEN UND INVESTITIONEN
            </Box>
          </Heading>
        </HeadingWrapper>
        <Flex justifyContent="center" alignItems="center" mt={printMode ? 5 : 10}>
          <IncomePieChart maxW="600px" maxH="370px" w="100%" h="100%" />
        </Flex>
      </Box>
    </PageWrapper>
  );
};
