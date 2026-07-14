import { dashboardKeys } from "@/services/dashboardService";
import { transactionService } from "@/services/transactionService";
import type { TransactionsDailyBalance } from "@/types/backend/dashboard/transactions/response";
import type { QueryParamsType } from "@/types/backend/query_params";
import { useQuery } from "@tanstack/react-query";
import { format, startOfMonth } from "date-fns";
import { useState } from "react";

export default function useGetHistoryDailyBalance() {
    const [filters, setFilters] = useState<QueryParamsType>({
        fromDate: format(startOfMonth(new Date()), 'yyyy-MM-dd'),
        toDate: format(new Date(), 'yyyy-MM-dd'),
    });

    const query = useQuery<TransactionsDailyBalance[], Error>({
        queryKey: [...dashboardKeys.dailyBalances(), filters],
        queryFn: () => transactionService.getHistoryDailyBalance(filters),
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        placeholderData: (previousData: any) => previousData,
    });

    return {
        balances: query.data ?? [],
        isLoading: query.isLoading,
        isRefetching: query.isRefetching,
        error: query.error,
        filters,
        setFilters,
        refetch: query.refetch
    };


}