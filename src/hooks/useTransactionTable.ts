import { useMemo, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import {
    useReactTable,
    getCoreRowModel,
    type PaginationState,
    type SortingState,
    type ColumnFiltersState,
} from '@tanstack/react-table';
import { transactionService } from '@/services/transactionService';
import { buildPageable, buildQueryParams } from '@/lib/mapperAPITable';
import transactionsColumns from '@/tables/transactionsColumns';
import { dashboardKeys } from '@/services/dashboardService';

export function useTransactionsTable() {
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });
    const [sorting, setSorting] = useState<SortingState>([{ id: 'createdAt', desc: true }]);
    const [globalFilter, setGlobalFilter] = useState<string>('');
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const queryParams = useMemo(
        () => buildQueryParams(globalFilter, columnFilters),
        [globalFilter, columnFilters]
    );

    const pageableParams = useMemo(
        () => buildPageable(pagination.pageIndex, pagination.pageSize, sorting),
        [pagination, sorting]
    );

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: [...dashboardKeys.transactions(), 'table', queryParams, pageableParams],
        queryFn: () => transactionService.getTransactions(queryParams, pageableParams),
        refetchOnMount: true,
        placeholderData: keepPreviousData,
        select: (response) => ({
            rows: response.data,
            pageCount: response.meta?.totalPages ?? 0,
            totalElements: response.meta?.totalElements ?? 0,
        }),
    });

    const table = useReactTable({
        data: data?.rows ?? [],
        columns: transactionsColumns,
        pageCount: data?.pageCount ?? -1,
        state: {
            pagination,
            sorting,
            globalFilter,
            columnFilters,
        },
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnFiltersChange: setColumnFilters,

        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        getCoreRowModel: getCoreRowModel(),
    });

    return {
        table,
        isLoading,
        isError,
        error,
        refetch,
        totalElements: data?.totalElements ?? 0,
        pageCount: data?.pageCount ?? 0,
    };
}