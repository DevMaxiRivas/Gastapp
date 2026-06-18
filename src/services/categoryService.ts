import type { QueryParamsType } from "@/types/backend/query_params";
import { authFetch, getQueryString } from "@/lib/apiClient";
import type { CategoriesResponseApi, Category } from "@/types/backend/category/response";
import { parseBackendErrorToString } from "@/lib/backend";
import type { BackendErrorResponse } from "@/types/backend/errors";

const ENDPOINT = "/categories";
const categoryService = {
    async getCategories(): Promise<Category[]> {
        const queryParams: QueryParamsType = {
            size: 50
        };
        let URL = `${ENDPOINT}`;
        if (queryParams) {
            URL += `?${getQueryString(queryParams)}`;
        }
        const res = await authFetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!res.ok) {
            const errorResponse: BackendErrorResponse = await res.json();
            throw new Error(`Error retrieving the response from the URL ${ENDPOINT}.` + parseBackendErrorToString(errorResponse));
        }
        const data: CategoriesResponseApi = await res.json();
        return data.data;
    }
}

export default categoryService;