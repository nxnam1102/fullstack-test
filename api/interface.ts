export interface SearchParameter {
  pageSize: number;
  pageIndex: number;
  searchText: string;
}

export interface ResultPagination {
  data: any[];
  searchText: string;
  pageSize: number;
  pageIndex: number;
  offset: number;
  total: number;
}
