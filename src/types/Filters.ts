export type FilterDetails = {
  filterTheme: string;
  filterModel: FilterModel[];
  placeholder: string;
  url: string;
};

export type FilterModel = {
  aggregateTableTitle: string;
  filters: string[];
  aggregateTableKey: string;
  autoFiltersPopulation: boolean;
};

export type DataModel = {
  accountGroup: string;
  accountName: string;
  view: string;
  apirCode: string;
  asOfDate: string;
  "1m": string;
  "3m": string;
  "6m": string;
  "1y": string;
  "3y": string;
  "5y": string;
  since_inception: string;
};
