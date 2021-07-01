import React, { FC, useEffect, useState } from 'react';
import {
  Spinner,
  Button,
  useDisclosure,
  Flex,
  StatGroup,
  ButtonGroup,
  Divider,
  IconButton,
  Stat,
  StatHelpText,
  StatLabel,
  Box,
  Skeleton,
} from '@chakra-ui/react';
import { FormikContextType } from 'formik';
import { useRouter } from 'next/router';
import useFetchCognitoQuery from 'src/modules/cognito/query-hooks/useFetchCognitoQuery';
import useResendEmailMutation from 'src/modules/cognito/query-hooks/useResendEmailMutation';
import { DeleteIcon } from 'src/theme/icons/DeleteIcon';
import { AgentDeleteModal } from '../modal/AgentDeleteModal';
import { AgentToggleStatusModal } from '../modal/AgentToggleStatusModal';
import { ExistingAgentType } from './AgentEditForm';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import hasCognitoGroup from 'src/modules/auth/hasCognitoGroup';
import { log, LogLevel } from 'jexity-app/utils/logger';
import { ROLES } from 'src/API';

export interface AgentEditFormManagementProps {
  agent: ExistingAgentType | undefined | null;
  formikBag: FormikContextType<any> | null;
  isValid: boolean;
}

export const AgentEditFormManagement: FC<AgentEditFormManagementProps> = ({ agent, formikBag, isValid }) => {
  const router = useRouter();
  const toggleStatusModalDisclosure = useDisclosure();
  const deleteModalDisclosure = useDisclosure();
  const fetchCognito = useFetchCognitoQuery(agent?.email);
  const resendEmail = useResendEmailMutation(agent?.sub);
  const userStatus = agent?.cognitoStatus ?? fetchCognito.data?.UserStatus;
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const cognitoUser: CognitoUser = await Auth.currentAuthenticatedUser();
      if (await hasCognitoGroup(cognitoUser, ROLES.Admin)) {
        setShowActions(true);
      }
    };
    checkUser().catch((e) => {
      log(LogLevel.error, e, { label: 'AgentEditFormManagement', ...e });
    });
  }, []);

  return (
    <>
      <Flex
        justifyContent={agent && showActions ? 'space-between' : 'flex-end'}
        pos="relative"
        pb={agent ? [5, null, null, 3] : 4}
        w="100%"
      >
        {agent && showActions && (
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
                  {userStatus === 'CONFIRMED' ? 'Bestätigt' : 'Einladung gesendet'}
                </StatHelpText>
              </Skeleton>
            </Stat>
          </StatGroup>
        )}
        <Box>
          <ButtonGroup variant="solid" spacing={4} fontFamily="heading">
            {agent && showActions && (
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
                    Einladung erneut senden
                  </Button>
                </Skeleton>
                <Skeleton isLoaded={!fetchCognito.isLoading}>
                  <Button
                    colorScheme={fetchCognito.data?.Enabled ? 'support.alert' : 'support.success'}
                    onClick={() => toggleStatusModalDisclosure.onOpen()}
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
      {agent && showActions && (
        <>
          <AgentToggleStatusModal
            agent={agent}
            disclosure={toggleStatusModalDisclosure}
            onUpdate={async () => await fetchCognito.refetch()}
          />
          <AgentDeleteModal
            agent={agent}
            disclosure={deleteModalDisclosure}
            onDelete={() => void router.push('/admin')}
          />
        </>
      )}
    </>
  );
};
