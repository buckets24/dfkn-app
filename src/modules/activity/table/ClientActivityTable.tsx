import { Button } from '@chakra-ui/button';
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/layout';
import { IconButton, Table, TableColumnHeaderProps, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/toast';
import Card from 'jexity-app/card/Card';
import DataTableModal from 'jexity-app/data-table/ActionModals/DataTableModal';
import { CheckIcon } from 'jexity-app/icons/CheckIcon';
import { RichTextEditor } from 'jexity-app/rich-text-editor/RichTextEditor';
import formatDateToDe from 'jexity-app/utils/formatDateToDe';
import { log, LogLevel } from 'jexity-app/utils/logger';
import removeEmptyArrayItems from 'jexity-app/utils/removeEmptyArrayItems';
import routerQueryGetAsString from 'jexity-app/utils/routerQueryGetAsString';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useState } from 'react';
import { isUnauthorizedError } from 'src/modules/common/utils';
import { DeleteIcon } from 'src/theme/icons/DeleteIcon';
import { FlagIcon } from 'src/theme/icons/FlagIcon';
import { SquarePlusIcon } from 'src/theme/icons/SquarePlusIcon';
import { gotoLogin } from 'src/views/common/routing';
import { AsyncReturnType } from 'type-fest';
import { createClientActivity } from '../../client/clientService';
import {
  activityToastDeletingClientActivityErr,
  activityToastDeletingClientActivitySuccess,
  activityToastLoadingUnknownErr,
} from '../activityMsg';
import { ClientActivityFormModal } from '../modal/ClientActivityFormModal';
import useClientActivitiesByClientIdQuery from '../query-hooks/useClientActivityByClientIdQuery';
import useDeleteClientActivityMutation from '../query-hooks/useDeleteClientActivityMutation';

export type ActivityItem = Pick<
  NonNullable<AsyncReturnType<typeof createClientActivity>>,
  'id' | 'clientId' | 'createdAt' | 'dueDate' | 'description' | 'done' | 'priority' | 'editors'
>;

export const ClientActivityTable: FC = () => {
  const router = useRouter();
  const clientId = routerQueryGetAsString(router.query.id);
  const toast = useToast();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const deleteModalDisclosure = useDisclosure();
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | undefined>();

  const { isLoading, data, refetch } = useClientActivitiesByClientIdQuery(clientId, {
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        gotoLogin(router);
      }
      const errorCode = log(LogLevel.error, e?.message ?? 'requestClientActivitiesByClientId() in ActivitysList', e);
      toast(activityToastLoadingUnknownErr(errorCode));
    },
  });

  const onCellClick = useCallback((activity: ActivityItem) => {
    onOpen();
    setSelectedActivity(activity);
  }, []);

  const deleteClientActivityMutation = useDeleteClientActivityMutation({
    onSettled: undefined, // Don't fire the default since we do some async chaining in delete modal
    onSuccess: (deletedClientActivity) => {
      log(LogLevel.info, 'DELETE_CLIENT_ACTIVITY', {
        label: 'ClientActivityTable',
        message: `A activity with an id of ${deletedClientActivity?.id} was successfully deleted`,
      });
      toast(activityToastDeletingClientActivitySuccess());
    },
    onError: (e: any) => {
      toast(activityToastDeletingClientActivityErr(e.response.data.errorCode));
    },
  });

  const rows = data
    ?.flat()
    .filter(removeEmptyArrayItems)
    .map(({ id, clientId, dueDate, description, done, priority, createdAt, editors }) => ({
      id,
      clientId,
      dueDate,
      description,
      done,
      priority,
      createdAt,
      editors,
    }));

  const onCreateActivity = () => {
    onClose();
    setSelectedActivity(undefined);
  };

  const onUpdateActivity = () => {
    onClose();
    setSelectedActivity(undefined);
  };

  const onCancel = () => {
    onClose();
    setSelectedActivity(undefined);
  };

  const tableHeadingStyles: TableColumnHeaderProps = {
    px: 0,
    color: 'gray.800',
    border: 'none',
    fontFamily: 'body',
    fontWeight: 'normal',
    fontSize: 'initial',
    textTransform: 'initial',
    letterSpacing: 'initial',
  };

  return (
    <Card p={6} pt={10} mb={6} w={['100%', null, null, '70%']}>
      <SimpleGrid templateColumns="1fr min-content">
        <Heading as="h3" size="md" fontFamily="body">
          Aktivitäten
        </Heading>
        <Box>
          <Button
            variant="ghost"
            color="brand.primary.500"
            onClick={onOpen}
            _hover={{
              bg: 'brand.primary.500',
              color: 'white',
            }}
          >
            Aktivität hinzufügen
            <SquarePlusIcon ml={2} />
          </Button>

          <ClientActivityFormModal
            isOpen={isOpen}
            activity={selectedActivity}
            onCreateActivity={onCreateActivity}
            onUpdateActivity={onUpdateActivity}
            onClose={onCancel}
            onCancel={onCancel}
          />
        </Box>
      </SimpleGrid>
      {rows && rows.length > 0 && (
        <Table>
          <Thead>
            <Tr>
              <Th {...tableHeadingStyles}>Beschreibung</Th>
              <Th {...tableHeadingStyles}>Fällig am</Th>
              <Th {...tableHeadingStyles}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {rows.map((row, i) => {
              let priorityLabel = 'Normal';
              let priorityColor = 'brand.primary.500';

              switch (row.priority) {
                case 'HIGH':
                  priorityLabel = 'Hoch';
                  priorityColor = 'support.alert.500';
                  break;
                case 'LOW':
                  priorityLabel = 'Niedrig';
                  priorityColor = 'support.success.500';
                  break;
                default:
                  priorityLabel = 'Normal';
                  priorityColor = 'brand.primary.500';
              }

              return (
                <Tr
                  role="group"
                  key={i}
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  transition="background ease-in-out 300ms"
                  _hover={{
                    cursor: 'pointer',
                    bg: 'brand.primary.100',
                  }}
                  _last={{
                    borderBottom: '0px',
                  }}
                >
                  <Td d="grid" gridTemplateColumns="30px 1fr" gap={3} border="none" onClick={() => onCellClick(row)}>
                    <Box mt={1}>{row.done === 'Yes' && <CheckIcon color="support.success.500" />}</Box>
                    <Box>
                      <Box maxH={['400px', null, null, '600px']} pos="relative" overflowY="auto">
                        {row.description && (
                          <RichTextEditor
                            name="description"
                            value={row.description}
                            onChange={() => null}
                            isReadOnly
                            errorMessageSpacer={false}
                          />
                        )}
                      </Box>
                      <Text mt={2} color="gray.400" fontSize="sm">
                        <Box as="span" mr={3} color={priorityColor} fontWeight="bold">
                          <FlagIcon mr={1} w="15px" h="15px" />
                          {priorityLabel}
                        </Box>
                        {formatDateToDe(row.createdAt, 'd. MMM yyyy')}
                      </Text>
                    </Box>
                  </Td>
                  <Td px={0} minW="110px" border="none" onClick={() => onCellClick(row)}>
                    {row.dueDate && (
                      <Text color="gray.700" fontSize={['md', null, null, 'lg']}>
                        {formatDateToDe(row.dueDate, 'd. MMM yyyy')}
                      </Text>
                    )}
                  </Td>
                  <Td pl={0} border="none" isNumeric>
                    <IconButton
                      aria-label="Delete"
                      icon={<DeleteIcon />}
                      onClick={() => deleteModalDisclosure.onOpen()}
                      opacity={0}
                      bg="none"
                      _hover={{ bg: 'support.alert.500', color: 'white' }}
                      _groupHover={{ opacity: 1 }}
                    />
                    <DataTableModal
                      {...deleteModalDisclosure}
                      header="Kundenaktivität löschen"
                      body={`Möchten Sie die Aktivität wirklich löschen?`}
                      confirmText="Löschen"
                      onConfirm={async (setIsLoading) => {
                        setIsLoading(true);
                        await deleteClientActivityMutation.mutateAsync(row.id);
                        await refetch();
                        setIsLoading(false);
                        deleteModalDisclosure.onClose();
                      }}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </Card>
  );
};
