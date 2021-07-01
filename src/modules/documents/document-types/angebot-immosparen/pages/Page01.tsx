/* eslint-disable react/no-unescaped-entities */
import { Box, Heading } from '@chakra-ui/react';
import React, { FC } from 'react';
import { ContractorType } from 'src/API';
import { formatSalutation } from 'src/modules/common/utils';
import useDocumentByIdQuery from 'src/modules/documents/query-hooks/useDocumentByIdQuery';
import { useDocFormMeta } from 'src/modules/documents/useDocFormMeta';
import { PageWrapper } from '../../common/PageWrapper';
import { DFKLogo } from '../../investment-kompass/icons/DFKLogo';

export const Page01: FC = () => {
  const { activeDocumentId } = useDocFormMeta();
  const documentQuery = useDocumentByIdQuery(activeDocumentId, { enabled: false });
  const document = documentQuery.data;
  const contractor = document?.contractor === ContractorType.SECONDARY ? document.client.contractor : document?.client;

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
        gridTemplateColumns="1fr"
        justifyContent="space-between"
        pos="relative"
        p={12}
        w="100%"
        h="100%"
        bg="url('/images/map-bg.png')"
        backgroundPosition="bottom"
        backgroundRepeat="no-repeat"
      >
        <Box>
          <Heading
            fontFamily="body"
            as="h2"
            mt="50%"
            mb={16}
            color="documents.tertiary.500"
            fontSize="3xl"
            lineHeight={1}
            textAlign="right"
          >
            IHRE INVESTMENT STRATEGIE
            <br />
            <Box as="span" color="documents.secondary.700" textTransform="uppercase" fontSize="xl">
              HAND IN HAND
              <br />
              mit DFK NORD - Immobilien sparen
            </Box>
          </Heading>
          <Heading
            fontFamily="body"
            as="h2"
            mb={10}
            color="documents.tertiary.500"
            fontSize="2xl"
            lineHeight={1}
            textAlign="right"
          >
            ANGEBOT
            <br />
            <Box as="span" color="documents.secondary.700" textTransform="uppercase">
              {formatSalutation(contractor)}
            </Box>
          </Heading>
        </Box>
      </Box>
    </PageWrapper>
  );
};
