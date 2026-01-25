export type SortOrder = 'asc' | 'desc';

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface SortParams {
  sort_by?: string;
  order?: SortOrder;
}

export interface SearchParams {
  search?: string;
}
