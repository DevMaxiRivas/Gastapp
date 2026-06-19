import type { ColumnFilter, ColumnFiltersState, SortingState } from '@tanstack/react-table';
import { type QueryParamsType, type QueryPageableParams, type SortParamsType } from '@/types/backend/query_params';

export const mapSorting = (sorting: SortingState): SortParamsType[] => {
  return sorting.map(s => ({
    sort: s.id,
    direction: s.desc ? 'desc' : 'asc',
  }));
};
export const buildPageable = (pageIndex: number, pageSize: number, sorting: SortingState): QueryPageableParams => {
  return {
    page: pageIndex,
    size: pageSize,
    sort: mapSorting(sorting),
  };
};

export const buildQueryParams = (globalFilter: string, columnFilters: ColumnFiltersState): QueryParamsType => {
  const params: QueryParamsType = {};

  if (globalFilter) params.noteContains = globalFilter;
  columnFilters.forEach((filter: ColumnFilter) => {
    params[filter.id] = filter.value as string;
  });

  return params;
};