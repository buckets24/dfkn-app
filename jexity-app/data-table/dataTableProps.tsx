import { BoxProps } from '@chakra-ui/react';
import {
  Column,
  Row,
  TableInstance,
  TableState,
  UseGlobalFiltersInstanceProps,
  UseGlobalFiltersOptions,
  UseGlobalFiltersState,
  UseRowSelectInstanceProps,
  UseRowSelectOptions,
  UseRowSelectRowProps,
  UseRowSelectState,
  UseSortByColumnOptions,
  UseSortByInstanceProps,
  UseSortByState,
  UseTableOptions,
} from 'react-table';

export const CHECKBOX_COLUMN_ID = 'CHECKBOX_COLUMN_ID';

/**
 * Props for the data table component
 */
export type OnSelectRows = (rows: string[]) => void;
export type OnDeleteRows = (rows: string[]) => void;
export interface DataTableProps<D extends Record<string, unknown>> extends DataTableInfiniteLoader {
  hasSelection?: boolean;
  columns: Array<Column<D>>;
  data: Array<D>;
  globalFilter: string;
  containerProps?: BoxProps;
  rowHeight?: number;
  /**
   * When rows are selected
   */
  onSelectRows?: OnSelectRows;

  /**
   * Delete action was clicked while any number of rows
   * are selected
   */
  onDeleteRows?: OnDeleteRows;
}

/**
 * Typings for basic data table
 */
export type DataTableOptions<D extends Record<string, unknown>> = UseTableOptions<D> &
  UseGlobalFiltersOptions<D> &
  UseRowSelectOptions<D> &
  UseSortByColumnOptions<D>;
export type DataTableInstance<D extends Record<string, unknown>> = TableInstance<D> &
  UseGlobalFiltersInstanceProps<D> &
  UseRowSelectInstanceProps<D> &
  UseSortByInstanceProps<D>;
export type DataTableState<D extends Record<string, unknown>> = TableState<D> &
  UseGlobalFiltersState<D> &
  UseRowSelectState<D> &
  UseSortByState<D>;
export type DataTableColumn<D extends Record<string, any>> = Array<Column<D>>;
export type DataTableRows<D extends Record<string, unknown>> = (Row<D> & UseRowSelectRowProps<D>)[];

export interface DataTableInfiniteLoader {
  /**
   * Copied from react-window-infinite-loader types, it is not exported
   */
  loadMoreItems: (startIndex: number, stopIndex: number) => Promise<any> | null;
}
