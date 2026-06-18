import { useQuery } from "@tanstack/react-query";
import type { Category } from "@/types/backend/category/response";
import { dashboardKeys } from "@/services/dashboardService";
import categoryService from "@/services/categoryService";

export function useCategories() {
    const query = useQuery<Category[], Error>({
        queryKey: dashboardKeys.categories(),
        queryFn: categoryService.getCategories,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    return {
        categories: query.data ?? null,
        isLoading: query.isLoading,
        isRefetching: query.isRefetching,
        error: query.error,
    };
}
