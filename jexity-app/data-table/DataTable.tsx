import { Box, Flex, SimpleGrid, Text, useDisclosure } from '@chakra-ui/react';
import Card from 'jexity-app/card/Card';
import MeasuredBox from 'jexity-app/measured-box/MeasuredBox';
import React, { FC, useEffect, useMemo } from 'react';
import {
  FilterType,
  FilterTypes,
  HeaderGroup,
  useBlockLayout,
  useFilters,
  useGlobalFilter,
  useRowSelect,
  useSortBy,
  UseSortByColumnProps,
  useTable,
} from 'react-table';
import { TriangleIcon } from 'jexity-app/icons/TriangleIcon';
import DataTableModal from './ActionModals/DataTableModal';
import DataTableBody, { LoaderType } from './DataTableBody';
import {
  CHECKBOX_COLUMN_ID,
  DataTableInstance,
  DataTableOptions,
  DataTableProps,
  DataTableRows,
  DataTableState,
} from './dataTableProps';

/**
 * When using this table make sure that all props are memoized
 * for best possible performance. Recomputation for this component
 * may get out of hand.
 */
function DataTable<D extends Record<string, any>>({
  hasSelection = true,
  columns,
  data,
  globalFilter,
  onSelectRows,
  onDeleteRows,
  loadMoreItems,
  rowHeight,
  loaderType,
}: DataTableProps<D> & LoaderType): ReturnType<FC> {
  const deleteModalDisclosure = useDisclosure();

  const filterTypes: FilterTypes<D> = useMemo<FilterTypes<D>>(() => {
    const filters: { [key: string]: FilterType<D> } = {
      /**
       * We can add any form of filtering options here.
       * I've removed fuzzyText because it performs very slowly.
       * If we need it https://github.com/farzher/fuzzysort we can
       * use this
       */
    };
    return filters;
  }, []);

  const checkSelectionColumns = useMemo(() => {
    const selectionProps = {
      id: CHECKBOX_COLUMN_ID,
      maxWidth: 64,
    };

    if (hasSelection) {
      return [selectionProps, ...columns];
    } else {
      return columns;
    }
  }, [columns, hasSelection]);

  const tableOptions: DataTableOptions<D> = {
    columns: checkSelectionColumns,
    data: data,
    filterTypes,
  };

  const tableInstance: DataTableInstance<D> = useTable<D>(
    tableOptions,
    useFilters,
    useGlobalFilter, // useGlobalFilter!
    useSortBy,
    useRowSelect,
    useBlockLayout
  ) as DataTableInstance<D>;

  const { setGlobalFilter, headerGroups, getTableProps, getToggleAllRowsSelectedProps } = tableInstance;
  const tableState = tableInstance.state as DataTableState<D>;
  const rows = tableInstance.rows as DataTableRows<D>;

  useEffect(() => {
    setGlobalFilter(globalFilter);
  }, [globalFilter, setGlobalFilter]);

  useEffect(() => {
    if (onSelectRows) {
      onSelectRows(Object.keys(tableState.selectedRowIds));
    }
  }, [tableState.selectedRowIds, onSelectRows]);

  const disableGroupActions = rows.length === Object.keys(tableState.selectedRowIds).length;
  const { indeterminate, ...toggleAllRowsSelectedProps } = getToggleAllRowsSelectedProps();

  return (
    <>
      <SimpleGrid h="100%" overflow="hidden">
        <Flex data-name="data-table-actions" py={4}>
          {/* Not yet functional disabling for now */}
          {/* <Flex
            mx={4}
            w={`${columns.find((col) => col.id === CHECKBOX_COLUMN_ID)?.maxWidth}px`}
            alignItems="center"
            justifyContent="center"
            minH="40px"
            minW="64px"
          >
            <Checkbox
              borderColor="gray.300"
              type="checkbox"
              {...toggleAllRowsSelectedProps}
              isIndeterminate={indeterminate ? indeterminate : undefined}
            />
          </Flex>
          {!!Object.keys(tableState.selectedRowIds).length && (
            <>
              <Button variant="ghost" textTransform="uppercase" fontSize="xs" disabled>
                <DisableIcon mr={2} /> Disable
              </Button>
              <Button
                variant="ghost"
                textTransform="uppercase"
                fontSize="xs"
                onClick={deleteModalDisclosure.onOpen}
                disabled={disableGroupActions}
              >
                <DeleteIcon mr={2} />
                Delete
              </Button>
            </>
          )} */}
        </Flex>
        <Card data-name="data-table" h="100%" overflow="auto">
          <SimpleGrid {...getTableProps()} h="100%" w="100%" gridTemplateRows="min-content 1fr" overflow="auto">
            <Box>
              {headerGroups.map((headerGroup) => {
                const { key, ...headerGroupProps } = headerGroup.getHeaderGroupProps();
                const { style, ...otherHeaderProps } = headerGroupProps;
                return (
                  <Box
                    key={key}
                    {...otherHeaderProps}
                    d="flex"
                    w="100%"
                    h="64px"
                    borderBottom="2px solid"
                    borderColor="gray.500"
                  >
                    {headerGroup.headers.map((c) => {
                      const column = c as HeaderGroup<D> & UseSortByColumnProps<D>;
                      const { key, ...columnHeaderProps } = column.getHeaderProps(column.getSortByToggleProps());

                      const sortIconDirection = column.isSorted ? `black` : `gray.300`;

                      const cell =
                        column.id === CHECKBOX_COLUMN_ID ? (
                          <Flex d="flex" alignItems="center" justifyContent="center" h="100%"></Flex>
                        ) : (
                          column.Header !== 'action' && (
                            <Text
                              textTransform="uppercase"
                              letterSpacing="1px"
                              fontSize="xs"
                              fontWeight="bold"
                              lineHeight="64px"
                              d="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              userSelect="none"
                            >
                              <span>{column.render('Header')}</span>
                              <TriangleIcon
                                color={sortIconDirection}
                                transition="0.2s"
                                transform={`rotate(${column.isSorted && column.isSortedDesc ? 180 : 0}deg)`}
                              />
                            </Text>
                          )
                        );

                      return (
                        <Flex key={key} {...columnHeaderProps} mx={4}>
                          {cell}
                        </Flex>
                      );
                    })}
                  </Box>
                );
              })}
            </Box>
            <Box overflow="hidden">
              <MeasuredBox>
                <DataTableBody
                  rows={rows}
                  tableInstance={tableInstance}
                  loadMoreItems={loadMoreItems}
                  rowHeight={rowHeight}
                  loaderType={loaderType}
                />
              </MeasuredBox>
            </Box>
          </SimpleGrid>
        </Card>
        {/* Not yet functional disabling for now */}
        {/* <DataTableModal
          {...deleteModalDisclosure}
          header="Löschen"
          body={`Löschen: ${Object.keys(tableState.selectedRowIds).join(', ')}`}
          confirmText="Löschen"
          onConfirm={() => {
            if (onDeleteRows) {
              onDeleteRows(Object.keys(tableState.selectedRowIds));
            }
          }}
        /> */}
      </SimpleGrid>
    </>
  );
}

export default DataTable;
