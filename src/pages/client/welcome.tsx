import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { AgentPublicModel } from 'src/modules/agent/api/AgentModel';
import ClientModel from 'src/modules/client/api/ClientModel';
import { NessyCloudLogo } from 'src/theme/icons/NessyCloudLogo';
import { AuthGuard } from 'src/views/common/AuthGuard';
import Header from 'src/views/common/Header';
import { LogLevel, log } from 'jexity-app/utils/logger';
import NextLink from 'next/link';
import { FooterLayout } from 'jexity-app/layout/FooterLayout';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import axios from 'axios';
import { agentToastLoadingUnknowErr } from 'src/modules/agent/agentMsg';

export interface WelcomeProps {
  client: ClientModel;
  agent: AgentPublicModel;
}

const Welcome: FC<WelcomeProps> = () => {
  const me = useAuthStore(getMe);
  const toast = useToast();
  const [responsibleAgent, setResponsibleAgent] = useState<AgentPublicModel>();

  useEffect(() => {
    if (me) {
      const requestResponsibleAgent = async () => {
        const agent = await axios.get<AgentPublicModel | null>(
          `/api/clients/${me.sub}/responsible-agent?agentId=${me.owner}`
        );
        if (agent.data) {
          setResponsibleAgent(agent.data);
        }
      };
      requestResponsibleAgent().catch((e) => {
        const errorCode = log(LogLevel.error, e?.message ?? 'requestResponsibleAgent() in ClientDashboard', e);
        toast(agentToastLoadingUnknowErr(errorCode));
      });
    }
  }, [me, toast]);

  return (
    <AuthGuard>
      <Box overflow="hidden" h="100%">
        <Box w="100%" h="64px">
          <Header />
        </Box>
        <Flex
          flexDir="column"
          justifyContent="space-between"
          w="100%"
          h="calc(100% - 64px)"
          bg="brand.gradientBackground"
        >
          <Flex
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            mt={20}
            p="32px"
            maxW="584px"
            maxH="401px"
            w="100%"
            h="100%"
            bg="white"
            borderRadius="6px"
            textAlign="center"
            mx="auto"
          >
            <NessyCloudLogo mb={8} minW="181px" minH="70px" />
            <Text mb={5} fontWeight={500} fontSize="xl">
              Hallo{' '}
              <Box as="span" color="brand.primary.500">
                {me?.salutation} {me?.title} {me?.firstName} {me?.lastName}
              </Box>{' '}
              und herzlich willkommen!
            </Text>
            <Text mb={5} fontWeight={500} fontSize="xl">
              Vielen Dank für Ihre erfolgreiche Registrierung.
            </Text>
            <Text mb={5} fontWeight={500} fontSize="xl">
              <Box as="span" color="brand.primary.500">
                {responsibleAgent?.salutation} {responsibleAgent?.lastName}
              </Box>{' '}
              wird sich in Kürze mit Ihnen in Verbindung setzen.
            </Text>
            <NextLink href="/client" passHref>
              <Button
                maxW="250px"
                bg="brand.primary.500"
                color="white"
                borderRadius="4px"
                fontFamily="body"
                fontWeight="normal"
                letterSpacing="1.25px"
                textTransform="uppercase"
                _hover={{
                  bg: 'brand.primary.900',
                }}
              >
                Zur persönlichen Ansicht
              </Button>
            </NextLink>
          </Flex>
          <FooterLayout color="white" px={[10, 0]} maxW={['100%', '584px']} w="100%" mx="auto" mb={6} />
        </Flex>
      </Box>
    </AuthGuard>
  );
};

export default Welcome;
