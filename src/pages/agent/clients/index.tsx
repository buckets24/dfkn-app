import { Box, Button, Flex, Heading, IconButton, SimpleGrid, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { API } from 'aws-amplify';
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
import { getMe, useAuthStore } from 'src/modules/auth/authStore';
import { ClientOverviewModel } from 'src/modules/client/api/ClientModel';
import { clientToastLoadingUnknownErr } from 'src/modules/client/clientMsg';
import { requestClientsByOwner } from 'src/modules/client/clientService';
import { ClientDeleteModal } from 'src/modules/client/modal/ClientDeleteModal';
import { ClientToggleStatusModal } from 'src/modules/client/modal/ClientToggleStatusModal';
import useClientsByOwnerIdInfiniteQuery from 'src/modules/client/query-hooks/useClientsByOwnerInfiniteQuery';
import { isUnauthorizedError } from 'src/modules/common/utils';
import { formatSalutation } from 'src/modules/common/utils';
import { DeleteIcon } from 'src/theme/icons/DeleteIcon';
import { DisableIcon } from 'src/theme/icons/DisableIcon';
import { getAgentLayout } from 'src/views/agents/AgentLayout';
import { gotoLogin } from 'src/views/common/routing';
import { PromiseValue } from 'type-fest';

type ClientItem = NonNullable<
  NonNullable<NonNullable<NonNullable<PromiseValue<ReturnType<typeof requestClientsByOwner>>>>['items']>[number]
>;

const ClientsList: FC & HasLayout = () => {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const router = useRouter();
  const me = useAuthStore(getMe);
  const toast = useToast();

  const { isLoading, data, error, fetchNextPage, hasNextPage, refetch } = useClientsByOwnerIdInfiniteQuery(me?.sub, {
    refetchOnWindowFocus: false,
    onError: (e: any) => {
      if (isUnauthorizedError(e)) {
        gotoLogin(router);
      }
      const errorCode = log(LogLevel.error, e?.message ?? 'requestClientsByOwner() in ClientsList', e);
      toast(clientToastLoadingUnknownErr(errorCode));
    },
  });

  const onClickName = useCallback(
    (client: ClientItem) => {
      void router.push('/agent/clients/[id]', `/agent/clients/${client.id}`);
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

  const columns: DataTableColumn<ClientOverviewModel> = useMemo<DataTableColumn<ClientOverviewModel>>(
    () => [
      {
        Header: 'Name',
        accessor: (client) => {
          return formatSalutation(client);
        },
        Cell: ({ cell, row }: CellProps<ClientItem>) => {
          const { style, ...cellProps } = cell.getCellProps();
          return (
            <Text {...cellProps} sx={{ cursor: 'pointer', ...style }} onClick={() => onClickName(row.original)}>
              {cell.value}
            </Text>
          );
        },
        minWidth: 200,
      },
      {
        Header: 'Telefon (privat)',
        accessor: 'telephone',
      },
      {
        Header: 'E-Mail',
        accessor: 'email',
        minWidth: 200,
      },
      {
        Header: 'Erstellt am',
        accessor: (client) => {
          const { createdAt } = client;
          return format(new Date(createdAt), 'd. MMM yyyy', { locale: de });
        },
        maxWidth: 110,
      },
      {
        Header: 'Status',
        accessor: (client) => {
          return !client.status && client.cognitoStatus === 'FORCE_CHANGE_PASSWORD'
            ? 'Offline'
            : client.cognitoStatus === 'CONFIRMED'
            ? 'Bestätigt'
            : 'Einladung gesendet';
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
        Cell: ({ cell, row }: CellProps<ClientItem>) => {
          const toggleStatusModalDisclosure = useDisclosure();
          const deleteModalDisclosure = useDisclosure();
          return (
            <Box>
              <IconButton
                aria-label="Toggle Status"
                icon={row.original.status === 'DISABLED' ? <CheckIcon /> : <DisableIcon />}
                isDisabled={row.original.cognitoStatus === 'FORCE_CHANGE_PASSWORD'}
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
              <ClientToggleStatusModal client={row.original} disclosure={toggleStatusModalDisclosure} />
              <ClientDeleteModal client={row.original} disclosure={deleteModalDisclosure} />
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
    .map(({ salutation, title, firstName, lastName, email, id, sub, telephone, createdAt, status, cognitoStatus }) => ({
      salutation,
      title,
      firstName,
      lastName,
      email,
      id,
      sub,
      telephone,
      createdAt,
      status,
      cognitoStatus,
    }));

  return (
    <SimpleGrid data-item="grid" h="100%" gridTemplateRows="min-content 1fr" overflow="hidden">
      <DashboardHeading p={6}>
        <Flex flexDir={['column', null, 'row']} justifyContent="space-between" alignItems="center">
          <Heading as="h2" fontFamily="heading" fontWeight="bold" fontSize={['xl', null, null, '4xl']}>
            Kundenmanagement
          </Heading>
          <Flex flexDir={['column', null, 'row']} mt={[5, null, 0]}>
            <Box>
              <GlobalSearchBar
                placeholder="Suche"
                onChange={(newValue) => setGlobalFilter(newValue)}
                defaultSuggestions={Object.values(rows ?? {}).map((client) => `${formatSalutation(client)}`)}
              />
            </Box>
            <Box d={['none', null, 'block']} w="1px" bgColor="gray.300" mx={4} />
            <NextLink href="/agent/clients/edit" passHref>
              <Button mt={[5, null, 0]} px={4} size="lg" colorScheme="brand.primary" fontSize="sm">
                Kunde hinzufügen
              </Button>
            </NextLink>
          </Flex>
        </Flex>
      </DashboardHeading>
      <Box mx={6} mb={6} overflow="hidden">
        <DataTable<ClientOverviewModel>
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

ClientsList.getLayout = getAgentLayout;

export default ClientsList;
