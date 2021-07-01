import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import DataTableModal from 'jexity-app/data-table/ActionModals/DataTableModal';
import DataTable from 'jexity-app/data-table/DataTable';
import { DataTableColumn, OnDeleteRows, OnSelectRows } from 'jexity-app/data-table/dataTableProps';
import GlobalSearchBar from 'jexity-app/data-table/GlobalSearchBar';
import DashboardHeading from 'jexity-app/layout/DashboardHeading';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import formatDateToDe from 'jexity-app/utils/formatDateToDe';
import { log, LogLevel } from 'jexity-app/utils/logger';
import removeEmptyArrayItems from 'jexity-app/utils/removeEmptyArrayItems';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { CellProps } from 'react-table';
import { AgentAddMeetingForm } from 'src/modules/agent/forms/AgentAddMeetingForm';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import { clientToastLoadingUnknownErr } from 'src/modules/client/clientMsg';
import useClientsByOwnerIdInfiniteQuery from 'src/modules/client/query-hooks/useClientsByOwnerInfiniteQuery';
import { formatSalutation, isUnauthorizedError } from 'src/modules/common/utils';
import MeetingModel from 'src/modules/meetings/api/MeetingModel';
import {
  meetingToastDeletingMeetingErr,
  meetingToastDeletingMeetingSuccess,
  meetingToastLoadingUnknownErr,
} from 'src/modules/meetings/meetingsMsg';
import { requestMeetingsByOwner } from 'src/modules/meetings/meetingsService';
import useDeleteMeetingMutation from 'src/modules/meetings/query-hooks/useDeleteMeetingMutation';
import useMeetingsByOwnerInfiniteQuery from 'src/modules/meetings/query-hooks/useMeetingsByOwnerInfiniteQuery';
import { CirclePlusIcon } from 'src/theme/icons/CirclePlusIcon';
import { DeleteIcon } from 'src/theme/icons/DeleteIcon';
import { getAgentLayout } from 'src/views/agents/AgentLayout';
import { gotoLogin } from 'src/views/common/routing';
import { PromiseValue } from 'type-fest';

type RequestMeetingsByOwnerItem = NonNullable<
  NonNullable<NonNullable<PromiseValue<ReturnType<typeof requestMeetingsByOwner>>>['items']>[number]
>;
export type MeetingOverviewModel = Pick<
  RequestMeetingsByOwnerItem,
  'id' | 'owner' | 'meetingDateTime' | 'moderatorId' | 'clientId' | 'client' | 'createdAt'
>;

const MeetingsList: FC & HasLayout = () => {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const router = useRouter();
  const me = useAuthStore(getMe);
  const toast = useToast();

  const { isLoading, data, refetch, error, fetchNextPage, hasNextPage } = useMeetingsByOwnerInfiniteQuery(me?.sub, {
    refetchOnWindowFocus: false,
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        gotoLogin(router);
      }
      const errorCode = log(LogLevel.error, e?.message ?? 'useMeetingsByOwnerInfiniteQuery() in MeetingsList', e);
      toast(meetingToastLoadingUnknownErr(errorCode));
    },
  });

  const deleteMeetingMutation = useDeleteMeetingMutation({
    onSettled: undefined, // Don't fire the default since we do some async chaining in delete modal
    onSuccess: (deletedMeeting) => {
      log(LogLevel.info, 'DELETE_MEETING', {
        label: 'MeetingList',
        message: `A meeting with an id of ${deletedMeeting?.id} was successfully deleted`,
      });
      toast(meetingToastDeletingMeetingSuccess());
    },
    onError: (e: any) => {
      toast(meetingToastDeletingMeetingErr(e.response.data.errorCode));
    },
  });

  useClientsByOwnerIdInfiniteQuery(me?.sub, {
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        gotoLogin(router);
      }
      const errorCode = log(LogLevel.error, e?.message ?? 'requestClientsByOwner() in MeetingsList', e);
      toast(clientToastLoadingUnknownErr(errorCode));
    },
  });

  const onClickName = useCallback(
    (meeting: MeetingOverviewModel) => {
      void router.push('/agent/meetings/[id]', `/agent/meetings/${meeting.id}`);
    },
    [router]
  );

  const onSelectRows = useCallback<OnSelectRows>((rows) => {
    /**
     * Do something here with the selected rows
     */
  }, []);
  const onDeleteRows = useCallback<OnDeleteRows>((rows) => {
    /**
     * Do something here with the rows
     */
  }, []);

  const columns: DataTableColumn<MeetingOverviewModel> = useMemo<DataTableColumn<MeetingOverviewModel>>(
    () => [
      {
        Header: 'Kunde',
        accessor: (meeting) => {
          const client = meeting.client;
          return formatSalutation(client);
        },
        Cell: ({ cell, row }: CellProps<MeetingOverviewModel>) => {
          const { style, ...cellProps } = cell.getCellProps();
          return (
            <Text {...cellProps} sx={{ cursor: 'pointer', ...style }} onClick={() => onClickName(row.original)}>
              {cell.value}
            </Text>
          );
        },
      },
      {
        Header: 'Datum',
        accessor: ({ meetingDateTime }) => formatDateToDe(meetingDateTime, 'd. MMM yyyy'),
        Cell: ({ cell }: CellProps<MeetingModel>) => {
          return <Text>{cell.value}</Text>;
        },
        minWidth: 200,
      },
      {
        Header: 'Zeit',
        accessor: ({ meetingDateTime }) => formatDateToDe(meetingDateTime, 'H.mm'),
        Cell: ({ cell }: CellProps<MeetingModel>) => {
          return <Text>{cell.value}</Text>;
        },
      },
      // {
      //   Header: 'Status',
      //   accessor: 'status',
      //   Cell: ({ cell }: CellProps<MeetingModel>) => {
      //     return <MeetingStatus status={cell.value} />;
      //   },
      // },
      {
        Header: 'action',
        Cell: ({ cell, row }: CellProps<MeetingOverviewModel>) => {
          const deleteModalDisclosure = useDisclosure();
          const targetId = row.original.id;

          return (
            <Box>
              {/* Not yet functional disabling for now */}
              {/* <IconButton
                aria-label="Disable"
                icon={<DisableIcon />}
                onClick={() => alert(`Disabled ${row.values['Kunde']}`)}
                mr={3}
                bg="none"
                _hover={{ bg: 'gray.300', color: 'white' }}
              /> */}

              <IconButton
                aria-label="Delete"
                icon={<DeleteIcon />}
                onClick={deleteModalDisclosure.onOpen}
                bg="none"
                _hover={{ bg: 'support.alert.500', color: 'white' }}
              />

              <DataTableModal
                {...deleteModalDisclosure}
                header="Meeting Löschen"
                body={`Sind Sie sicher, dass Sie das Meeting mit ${row.values['Kunde']} am ${row.values['Datum']} um ${row.values['Zeit']} Uhr löschen möchten?`}
                confirmText="Löschen"
                onConfirm={async (setIsLoading) => {
                  setIsLoading(true);
                  await deleteMeetingMutation.mutateAsync(targetId);
                  await refetch();
                  setIsLoading(false);
                  deleteModalDisclosure.onClose();
                }}
              />
            </Box>
          );
        },
      },
    ],
    [onClickName, toast]
  );

  const rows = data?.pages
    .map((page) => page?.items)
    .flat()
    .filter(removeEmptyArrayItems)
    .map(({ id, owner, meetingDateTime, moderatorId, clientId, client, createdAt }) => ({
      id,
      owner,
      meetingDateTime,
      moderatorId,
      clientId,
      client,
      createdAt,
    }));

  return (
    <SimpleGrid data-item="grid" h="100%" gridTemplateRows="min-content 1fr" overflow="hidden">
      <DashboardHeading p={6}>
        <Flex flexDir={['column', null, 'row']} justifyContent="space-between" alignItems="center">
          <Heading as="h2" fontSize={['xl', null, null, '4xl']}>
            Meetingverwaltung
          </Heading>
          <Flex flexDir={['column', null, 'row']} mt={[5, null, 0]}>
            <Box>
              <GlobalSearchBar
                placeholder="Suche"
                onChange={(newValue) => setGlobalFilter(newValue)}
                defaultSuggestions={Object.values(rows ?? {}).map(
                  (meeting) => `${meeting.client.firstName} ${meeting.client.lastName}`
                )}
              />
            </Box>
            <Box d={['none', null, 'block']} w="1px" bgColor="gray.300" mx={4} />
            <Popover closeOnBlur={false} placement="bottom-end">
              {({ onClose }) => (
                <>
                  <PopoverTrigger>
                    <Button
                      mt={[5, null, 0]}
                      px={4}
                      size="lg"
                      colorScheme="brand.primary"
                      fontWeight={500}
                      fontSize="sm"
                    >
                      <CirclePlusIcon mr={3} /> Neues Meeting
                    </Button>
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent
                      p={3}
                      border="none"
                      borderRadius="4px"
                      /**
                       *  Added !important so that the boxShadow is not being removed
                       */
                      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.15) !important"
                      maxW="380px"
                    >
                      <PopoverCloseButton />
                      <PopoverHeader border="none">
                        <Heading as="h4" fontWeight={700} fontSize="xl">
                          Neues Meeting
                        </Heading>
                      </PopoverHeader>
                      <PopoverBody>
                        <AgentAddMeetingForm onClose={onClose} />
                      </PopoverBody>
                    </PopoverContent>
                  </Portal>
                </>
              )}
            </Popover>
          </Flex>
        </Flex>
      </DashboardHeading>
      <Box mx={6} mb={6} overflow="hidden">
        <DataTable<MeetingOverviewModel>
          columns={columns}
          data={rows ?? []}
          globalFilter={globalFilter}
          onSelectRows={onSelectRows}
          onDeleteRows={onDeleteRows}
          loadMoreItems={async () => {
            if (hasNextPage) {
              await fetchNextPage();
            }
          }}
        />
      </Box>
    </SimpleGrid>
  );
};

MeetingsList.getLayout = getAgentLayout;

export default MeetingsList;
