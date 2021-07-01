import { Box, Button, Flex, Heading, IconButton, SimpleGrid, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { format } from 'date-fns';
import de from 'date-fns/locale/de';
import DataTable from 'jexity-app/data-table/DataTable';
import { DataTableColumn, OnDeleteRows, OnSelectRows } from 'jexity-app/data-table/dataTableProps';
import GlobalSearchBar from 'jexity-app/data-table/GlobalSearchBar';
import { CheckIcon } from 'jexity-app/icons/CheckIcon';
import DashboardHeading from 'jexity-app/layout/DashboardHeading';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import { log, LogLevel } from 'jexity-app/utils/logger';
import removeEmptyArrayItems from 'jexity-app/utils/removeEmptyArrayItems';
import { useRouter } from 'next/dist/client/router';
import NextLink from 'next/link';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { CellProps } from 'react-table';
import 'src/AmplifyConfig';
import { agentMsgLoadingLabel, agentToastLoadingUnknowErr } from 'src/modules/agent/agentMsg';
import { requestAgents } from 'src/modules/agent/agentService';
import { AgentOverviewModel } from 'src/modules/agent/api/AgentModel';
import { AgentDeleteModal } from 'src/modules/agent/modal/AgentDeleteModal';
import { AgentToggleStatusModal } from 'src/modules/agent/modal/AgentToggleStatusModal';
import useAgentsInfiniteQuery from 'src/modules/agent/query-hooks/useAgentsInfiniteQuery';
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import { DeleteIcon } from 'src/theme/icons/DeleteIcon';
import { DisableIcon } from 'src/theme/icons/DisableIcon';
import { getAdminLayout } from 'src/views/admin/AdminLayout';
import { PromiseValue } from 'type-fest';

type Agent = NonNullable<NonNullable<NonNullable<PromiseValue<ReturnType<typeof requestAgents>>>['items']>[number]>;

const AgentsList: FC & HasLayout = () => {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const router = useRouter();
  const me = useAuthStore(getMe);
  const toast = useToast();

  const { isLoading, data, error, fetchNextPage, hasNextPage, refetch } = useAgentsInfiniteQuery({
    refetchOnWindowFocus: false,
    onError: (e: any) => {
      const errorCode = log(LogLevel.error, e.message, { label: agentMsgLoadingLabel, ...e });
      toast(agentToastLoadingUnknowErr(errorCode));
    },
  });

  const onClickName = useCallback(
    (user: Agent) => {
      void router.push('/admin/agent/[id]', `/admin/agent/${user.id}`);
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

  const columns: DataTableColumn<AgentOverviewModel> = useMemo<DataTableColumn<AgentOverviewModel>>(
    () => [
      {
        Header: 'Name',
        accessor: (agent) => {
          return `${agent.firstName} ${agent.lastName}`;
        },
        Cell: ({ cell, row }: CellProps<Agent>) => {
          const { style, ...cellProps } = cell.getCellProps();
          return (
            <Text {...cellProps} sx={{ cursor: 'pointer', ...style }} onClick={() => onClickName(row.original)}>
              {cell.value}
            </Text>
          );
        },
        minWidth: 300,
      },
      // {
      //   Header: 'Telefon',
      //   accessor: 'phone',
      // },
      {
        Header: 'E-Mail',
        accessor: 'email',
        minWidth: 200,
      },
      {
        Header: 'Erstellt am',
        accessor: (agent) => {
          const { createdAt } = agent;
          try {
            return format(new Date(createdAt), 'd. MMM yyyy', { locale: de });
          } catch (e) {
            return `Can't process date`;
          }
        },
        maxWidth: 110,
      },
      {
        Header: 'Status',
        accessor: (agent) => {
          return agent.cognitoStatus === 'CONFIRMED' ? 'Bestätigt' : 'Einladung gesendet';
        },
        maxWidth: 110,
      },
      {
        Header: 'Aktiviert',
        accessor: (client) => {
          return client.status === 'DISABLED' ? 'Nein' : 'Ja';
        },
        maxWidth: 100,
      },
      {
        Header: 'action',
        Cell: ({ cell, row }: CellProps<Agent>) => {
          const toggleStatusModalDisclosure = useDisclosure();
          const deleteModalDisclosure = useDisclosure();
          return (
            <Box>
              <IconButton
                aria-label="Toggle Status"
                icon={row.original.status === 'DISABLED' ? <CheckIcon /> : <DisableIcon />}
                onClick={() => toggleStatusModalDisclosure.onOpen()}
                mr={3}
                bg="none"
                _hover={{ bg: row.original.status === 'DISABLED' ? 'green.300' : 'gray.300', color: 'white' }}
              />
              <IconButton
                aria-label="Delete"
                icon={<DeleteIcon />}
                onClick={() => deleteModalDisclosure.onOpen()}
                bg="none"
                _hover={{ bg: 'support.alert.500', color: 'white' }}
              />
              <AgentToggleStatusModal agent={row.original} disclosure={toggleStatusModalDisclosure} />
              <AgentDeleteModal agent={row.original} disclosure={deleteModalDisclosure} />
            </Box>
          );
        },
      },
    ],
    [onClickName, refetch, toast]
  );

  useEffect(() => {
    void fetchNextPage();
    /**
     * Make sure to only fire this on auth initialized and once
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me?.sub]);

  const rows = data?.pages
    .map((page) => page?.items)
    .flat()
    .filter(removeEmptyArrayItems)
    .filter((row) => !!row.sub)
    .map(({ firstName, lastName, email, id, phone, createdAt, sub, salutation, role, status, cognitoStatus }) => ({
      firstName,
      lastName,
      email,
      id,
      phone,
      sub,
      salutation,
      role,
      status,
      cognitoStatus,
      createdAt,
    }));

  return (
    <>
      <SimpleGrid data-item="grid" h="100%" gridTemplateRows="min-content 1fr" overflow="hidden">
        <DashboardHeading p={6}>
          <Flex flexDir={['column', null, 'row']} justifyContent="space-between" alignItems="center">
            <Heading as="h2" fontSize={['xl', null, null, '4xl']}>
              Beraterverwaltung
            </Heading>
            <Flex flexDir={['column', null, 'row']} mt={[5, null, 0]}>
              <GlobalSearchBar
                placeholder="Suche"
                onChange={(newValue) => setGlobalFilter(newValue)}
                defaultSuggestions={Object.values(rows ?? {}).map((agent) => `${agent.firstName} ${agent.lastName}`)}
              />
              <Box d={['none', null, 'block']} w="1px" bgColor="gray.300" mx={4} />
              <NextLink href="/admin/agent/edit" passHref>
                <Button mt={[5, null, 0]} px={4} size="lg" colorScheme="brand.primary" fontSize="sm">
                  Berater hinzufügen
                </Button>
              </NextLink>
            </Flex>
          </Flex>
        </DashboardHeading>
        <Box mx={6} mb={6} overflow="hidden">
          <DataTable<AgentOverviewModel>
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
    </>
  );
};

AgentsList.getLayout = getAdminLayout;

export default AgentsList;
