import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  IconButton,
  Skeleton,
  Spinner,
  Stat,
  StatGroup,
  StatHelpText,
  StatLabel,
  useDisclosure,
} from '@chakra-ui/react';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import { FormikContextType } from 'formik';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';
import { AGENT_ROLES } from 'src/modules/agent/api/role';
import hasCognitoGroup from 'src/modules/auth/hasCognitoGroup';
import useFetchCognitoQuery from 'src/modules/cognito/query-hooks/useFetchCognitoQuery';
import useResendEmailMutation from 'src/modules/cognito/query-hooks/useResendEmailMutation';
import { DeleteIcon } from 'src/theme/icons/DeleteIcon';
import { ClientDeleteModal } from '../modal/ClientDeleteModal';
import { ClientToggleStatusModal } from '../modal/ClientToggleStatusModal';
import { ExistingClientType } from './ClientEditForm';

export interface ClientEditFormManagementProps {
  client: ExistingClientType | undefined | null;
  formikBag: FormikContextType<any> | null;
  isValid: boolean | undefined;
}

export const ClientEditFormManagement: FC<ClientEditFormManagementProps> = ({ client, formikBag, isValid }) => {
  const router = useRouter();
  const toggleStatusModalDisclosure = useDisclosure();
  const deleteModalDisclosure = useDisclosure();
  const fetchCognito = useFetchCognitoQuery(client?.email);
  const resendEmail = useResendEmailMutation(client?.sub);
  const userStatus = client?.cognitoStatus ?? fetchCognito.data?.UserStatus;
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const cognitoUser: CognitoUser = await Auth.currentAuthenticatedUser();
      if (await hasCognitoGroup(cognitoUser, [...AGENT_ROLES])) {
        /**
         * Hide other action buttons for client profile page
         */
        setShowActions(true);
      }
    };
    checkUser().catch((e) => {
      log(LogLevel.error, e, { label: 'AgentEditFClientEditFormManagementormManagement', ...e });
    });
  }, []);

  return (
    <>
      <Flex
        justifyContent={client && showActions ? 'space-between' : 'flex-end'}
        pos="relative"
        pb={client ? 0 : 4}
        w="100%"
        minH={['97px', null, null, '50px']}
      >
        {client && showActions && (
          <StatGroup>
            <Stat mr={8}>
              <StatLabel fontSize="16px" fontWeight={600}>
                Aktiviert
              </StatLabel>
              <Skeleton isLoaded={!fetchCognito.isLoading}>
                <StatHelpText>{!!fetchCognito.data?.Enabled ? 'Ja' : 'Nein'}</StatHelpText>
              </Skeleton>
            </Stat>
            <Stat>
              <StatLabel fontSize="16px" fontWeight={600}>
                Status
              </StatLabel>
              <Skeleton isLoaded={!fetchCognito.isLoading}>
                <StatHelpText whiteSpace="nowrap">
                  {!client.status && userStatus === 'FORCE_CHANGE_PASSWORD'
                    ? 'Offline'
                    : userStatus === 'CONFIRMED'
                    ? 'Bestätigt'
                    : 'Einladung gesendet'}
                </StatHelpText>
              </Skeleton>
            </Stat>
          </StatGroup>
        )}
        <Box>
          <ButtonGroup variant="solid" spacing={4} fontFamily="heading">
            {client && showActions && (
              <>
                <Skeleton isLoaded={!fetchCognito.isLoading}>
                  <Button
                    isLoading={resendEmail.isLoading}
                    onClick={() => resendEmail.mutateAsync()}
                    isDisabled={userStatus === 'CONFIRMED'}
                    px="32px"
                    maxH="40px"
                    bg="brand.primary.500"
                    color="white"
                    borderRadius="4px"
                    _hover={{ bg: 'brand.primary.900' }}
                  >
                    {!client.status ? 'Einladung senden' : 'Einladung erneut senden'}
                  </Button>
                </Skeleton>
                <Skeleton isLoaded={!fetchCognito.isLoading}>
                  <Button
                    colorScheme={fetchCognito.data?.Enabled ? 'support.alert' : 'support.success'}
                    onClick={() => toggleStatusModalDisclosure.onOpen()}
                    isDisabled={client.cognitoStatus === 'FORCE_CHANGE_PASSWORD'}
                    borderRadius="4px"
                  >
                    Account {fetchCognito.data?.Enabled ? 'deaktivieren' : 'aktivieren'}
                  </Button>
                </Skeleton>
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon />}
                  onClick={() => deleteModalDisclosure.onOpen()}
                  colorScheme="support.alert"
                  borderRadius="4px"
                />
                <Divider
                  orientation="vertical"
                  d={['none', null, null, null, 'block']}
                  w="1px"
                  h="40px"
                  borderLeftColor="gray.300"
                />
              </>
            )}
            <Button
              d={['none', null, null, 'flex']}
              type="submit"
              isLoading={formikBag?.isSubmitting}
              loadingText="Speichern…"
              px="32px"
              maxH="40px"
              bg="brand.primary.500"
              color="white"
              borderRadius="4px"
              _hover={{
                bg: 'brand.primary.900',
              }}
              isDisabled={!isValid || formikBag?.status === 'checking-email'}
              onClick={() => formikBag?.handleSubmit()}
            >
              Speichern
            </Button>
            <Button
              d={['none', null, null, 'flex']}
              variant="outline"
              px="32px"
              maxH="40px"
              borderWidth="1px"
              borderColor="brand.primary.500"
              borderRadius="4px"
              color="brand.primary.500"
              _hover={{
                bg: 'brand.primary.100',
              }}
              onClick={() => formikBag?.resetForm()}
            >
              Abbrechen
            </Button>
          </ButtonGroup>
          <ButtonGroup
            variant="solid"
            mt={4}
            spacing={4}
            fontFamily="heading"
            d={['block', null, null, 'none']}
            textAlign="right"
          >
            <Button
              type="submit"
              isLoading={formikBag?.isSubmitting}
              loadingText="Speichern…"
              px="32px"
              maxH="40px"
              bg="brand.primary.500"
              color="white"
              borderRadius="4px"
              _hover={{
                bg: 'brand.primary.900',
              }}
              isDisabled={!isValid || formikBag?.status === 'checking-email'}
              onClick={() => formikBag?.handleSubmit()}
            >
              Speichern
            </Button>
            <Button
              variant="outline"
              px="32px"
              maxH="40px"
              borderWidth="1px"
              borderColor="brand.primary.500"
              borderRadius="4px"
              color="brand.primary.500"
              _hover={{
                bg: 'brand.primary.100',
              }}
              onClick={() => formikBag?.resetForm()}
            >
              Abbrechen
            </Button>
          </ButtonGroup>
        </Box>
      </Flex>
      {client && showActions && (
        <>
          <ClientToggleStatusModal
            client={client}
            disclosure={toggleStatusModalDisclosure}
            onUpdate={async () => await fetchCognito.refetch()}
          />
          <ClientDeleteModal
            client={client}
            disclosure={deleteModalDisclosure}
            onDelete={() => void router.push('/agent/clients')}
          />
        </>
      )}
    </>
  );
};
