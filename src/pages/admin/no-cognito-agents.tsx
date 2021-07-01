import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Box, Button, Flex, Heading, IconButton, SimpleGrid, Text, useDisclosure, useToast } from '@chakra-ui/react';
import { API } from 'aws-amplify';
import axios from 'axios';
import { format } from 'date-fns';
import de from 'date-fns/locale/de';
import DataTableModal from 'jexity-app/data-table/ActionModals/DataTableModal';
import DataTable from 'jexity-app/data-table/DataTable';
import { DataTableColumn, OnDeleteRows, OnSelectRows } from 'jexity-app/data-table/dataTableProps';
import GlobalSearchBar from 'jexity-app/data-table/GlobalSearchBar';
import DashboardHeading from 'jexity-app/layout/DashboardHeading';
import { HasLayout } from 'jexity-app/layout/layoutApi';
import removeEmptyArrayItems from 'jexity-app/utils/removeEmptyArrayItems';
import NextLink from 'next/link';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { CellProps } from 'react-table';
import 'src/AmplifyConfig';
import { ListAgentModelsQuery, ListAgentModelsQueryVariables } from 'src/API';
import { listAgentModels } from 'src/graphql/queries';
import { DeleteAgentByIdHandlerResponse } from 'src/modules/agent/handlers/deleteAgentbyIdHandler';
import { DeleteIcon } from 'src/theme/icons/DeleteIcon';
import { getAdminLayout } from 'src/views/admin/AdminLayout';

type NoCognitoRow = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
};

type Agent = NonNullable<NonNullable<NonNullable<ListAgentModelsQuery['listAgentModels']>['items']>[number]>;

const NoCognitoAgentsList: FC & HasLayout = () => {
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const toast = useToast();

  const { isLoading, data, error, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery(
    ['no-cognito-agents'],
    async ({ pageParam = undefined }) => {
      const variables: ListAgentModelsQueryVariables = {
        limit: 100,
        nextToken: pageParam,
      };

      const res = (await API.graphql({
        query: listAgentModels,
        variables,
      })) as GraphQLResult<ListAgentModelsQuery>;

      return res.data?.listAgentModels;
    },
    {
      getNextPageParam: (nextPage) => (nextPage?.nextToken ? nextPage.nextToken : undefined),
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    void fetchNextPage();
    /**
     * Make sure to only fire this on auth initialized and once
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const columns: DataTableColumn<NoCognitoRow> = useMemo<DataTableColumn<NoCognitoRow>>(
    () => [
      {
        Header: 'Name',
        accessor: (user) => {
          return `${user.firstName} ${user.lastName}`;
        },
        Cell: ({ cell, row }: CellProps<Agent>) => {
          const { style, ...cellProps } = cell.getCellProps();
          return (
            <Text {...cellProps} sx={{ color: 'support.alert.500', ...style }}>
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
        accessor: (user) => {
          const { createdAt } = user;
          try {
            return format(new Date(createdAt), 'd. MMM yyyy', { locale: de });
          } catch (e) {
            return `Can't process date`;
          }
        },
      },
      {
        Header: 'action',
        Cell: ({ cell, row }: CellProps<Agent>) => {
          const deleteModalDisclosure = useDisclosure();
          const targetId = row.original.id;

          return (
            <Box>
              {/* Not yet functional disabling for now */}
              {/* <IconButton
                aria-label="Disable"
                icon={<DisableIcon />}
                onClick={() => alert(`Disabled ${row.original.firstName} ${row.original.lastName}`)}
                mr={3}
                bg="none"
                _hover={{ bg: 'gray.300', color: 'white' }}
              /> */}
              <IconButton
                aria-label="Delete"
                icon={<DeleteIcon />}
                onClick={() => deleteModalDisclosure.onOpen()}
                bg="none"
                _hover={{ bg: 'support.alert.500', color: 'white' }}
              />
              <DataTableModal
                {...deleteModalDisclosure}
                header="Datensatz löschen"
                body={`Sind Sie sicher, dass Sie ${row.values['Name']} löschen möchten?`}
                confirmText="Löschen"
                onConfirm={async (setIsLoading) => {
                  setIsLoading(true);
                  try {
                    const deleteResponse = await axios.delete<DeleteAgentByIdHandlerResponse>(
                      `/api/agents/${targetId}`
                    );
                    const deletedAgent = deleteResponse.data;
                    await refetch();
                    toast({
                      id: 'success-delete',
                      title: `${deletedAgent.firstName} ${deletedAgent.lastName} 'Datensatz wurde gelöscht.`,
                      isClosable: true,
                    });
                  } catch (e) {
                    if (e.response.data.type === 'AGENT_HAS_CLIENTS') {
                      toast({
                        status: 'error',
                        title: 'Fehler beim Löschen',
                        description: `Beim Löschen des Berater ist ein Fehler aufgetreten. Es scheint, dass der Berater immer noch Kunden hat. (Fehlercode: ${e.response.data.errorCode})`,
                        duration: 15000,
                        isClosable: true,
                      });
                      return;
                    } else {
                      toast({
                        status: 'error',
                        title: 'Fehler beim Löschen',
                        description: `Beim Löschen des Berater ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut. (Fehlercode: ${e.response.data.errorCode})`,
                        duration: 15000,
                        isClosable: true,
                      });
                    }
                  } finally {
                    setIsLoading(false);
                    deleteModalDisclosure.onClose();
                  }
                }}
              />
            </Box>
          );
        },
      },
    ],
    [toast]
  );

  const rows = data?.pages
    .map((page) => page?.items)
    .flat()
    .filter(removeEmptyArrayItems)
    .filter((row) => row.sub === null)
    .map(({ firstName, lastName, email, id, createdAt }) => ({
      firstName,
      lastName,
      email,
      id,
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
          <DataTable<NoCognitoRow>
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

NoCognitoAgentsList.getLayout = getAdminLayout;

export default NoCognitoAgentsList;
