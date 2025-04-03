export interface TableInfo {
  name: string;
  sql: string;
}

export interface ColumnInfo {
  cid: number;
  name: string;
  type: string;
  notnull: number;
  dflt_value: string | null;
  pk: number;
}

export interface TableData {
  columns: string[];
  values: any[][];
}

export interface QueryResult {
  columns: string[];
  values: any[][];
}

export interface Database {
  getTableNames: () => Promise<string[]>;
  getTableInfo: (tableName: string) => Promise<TableInfo>;
  getTableColumns: (tableName: string) => Promise<ColumnInfo[]>;
  getTableData: (tableName: string) => Promise<TableData>;
  executeQuery: (sql: string) => Promise<QueryResult>;
} 