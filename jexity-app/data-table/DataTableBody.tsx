import { Box, Checkbox, Flex } from '@chakra-ui/react';
import { useMeasuredBox } from 'jexity-app/measured-box/useMeasuredBox';
import { FC, PropsWithChildren, useCallback } from 'react';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import {
  CHECKBOX_COLUMN_ID,
  DataTableInfiniteLoader,
  DataTableInstance,
  DataTableRows,
  DataTableState,
} from './dataTableProps';

export interface DataTableBodyProps<D extends Record<string, unknown>> extends DataTableInfiniteLoader, LoaderType {
  rows: DataTableRows<D>;
  tableInstance: DataTableInstance<D>;
  rowHeight?: number;
}

export type LoaderType = {
  loaderType?: 'INFINITE' | 'EXPANDABLE';
};

function DataTableBody<D extends Record<string, unknown>>({
  rows,
  tableInstance,
  loadMoreItems,
  rowHeight = 56,
  loaderType = 'INFINITE',
}: DataTableBodyProps<D>): ReturnType<FC> {
  const dimens = useMeasuredBox();

  const height = dimens.height;

  const { getTableBodyProps, prepareRow, state } = tableInstance;
  const tableState = state as DataTableState<D>;

  const renderRow = useCallback(
    ({ index, style }: PropsWithChildren<ListChildComponentProps>) => {
      const row = rows[index];

      prepareRow(row);
      const {
        key,
        style: rowStyle,
        ...rowProps
      } = row.getRowProps({
        style,
      });

      const { top = 0, height = 0, position = 'absolute', width = '100%', display = 'flex' } = rowStyle || {};
      return (
        <Box
          key={key}
          pos={position}
          d={display}
          h={`${height}px`}
          w={width}
          {...rowProps}
          style={{
            top: top,
          }}
        >
          <Box
            role="group"
            h="100%"
            w="100%"
            d="flex"
            alignItems="center"
            borderBottom="1px solid"
            borderBottomColor="gray.300"
            backgroundColor={row.isSelected ? 'brand.primary.100' : 'transparent'}
          >
            {row.cells.map((cell) => {
              const { key, ...cellProps } = cell.getCellProps();
              const { style, role } = cellProps;
              const rowToggleProps = row.getToggleRowSelectedProps();

              const cellContent =
                cell.column.id === CHECKBOX_COLUMN_ID ? (
                  <Flex alignItems="center" justifyContent="center" h="100%">
                    <Checkbox
                      borderColor="gray.300"
                      isChecked={rowToggleProps.checked}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        return rowToggleProps.onChange?.(e);
                      }}
                    />
                  </Flex>
                ) : (
                  cell.render('Cell')
                );

              return (
                <Box
                  key={key}
                  sx={style}
                  role={role}
                  mx={4}
                  fontSize="md"
                  opacity={cell.column.Header !== 'action' ? 1 : 0}
                  transition="opacity .25s"
                  _groupHover={{
                    opacity: 1,
                  }}
                >
                  {cellContent}
                </Box>
              );
            })}
          </Box>
        </Box>
      );
    },
    /**
     * We need to fire a rerender for rows that have been selected and this is that way to tell
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [prepareRow, rows, tableState.selectedRowIds]
  );

  return (
    <div {...getTableBodyProps()}>
      {height && (
        <InfiniteLoader
          isItemLoaded={(index) => {
            /**
             * Return a boolean based on index of the rows of the list below is the reason
             * Threshold at which to pre-fetch data; defaults to 15.
             * A threshold of 15 means that data will start loading when a
             * user scrolls within 15 rows.
             *
             *
             * So basically if we return false for the very last item it will trigger
             * loadMoreItems if it is within 15 rows below of the inview item.
             */
            if (index === rows.length - 1) {
              return false;
            } else {
              return true;
            }
          }}
          itemCount={rows.length}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <FixedSizeList
              ref={ref}
              onItemsRendered={onItemsRendered}
              height={height}
              itemCount={rows.length}
              itemSize={rowHeight}
              width="100%"
            >
              {renderRow}
            </FixedSizeList>
          )}
        </InfiniteLoader>
      )}
    </div>
  );
}

export default DataTableBody;
