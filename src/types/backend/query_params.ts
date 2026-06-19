export type QueryParamsValues = string | number | boolean | Date | null | undefined;
export type QueryParamsType = Record<string, QueryParamsValues>;

export type SortParamsType = {
    sort: string;
    direction: "asc" | "desc";
};

export type QueryPageableParams = {
    page: number;
    size: number;
    sort?: SortParamsType[];
};