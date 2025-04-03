import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import { Database, TableInfo, ColumnInfo, TableData, QueryResult } from '../types';

export class SQLiteService implements Database {
  private db: SqlJsDatabase | null = null;
  private initialized: Promise<void>;

  constructor(arrayBuffer: ArrayBuffer) {
    this.initialized = this.init(arrayBuffer);
  }

  private async init(arrayBuffer: ArrayBuffer): Promise<void> {
    try {
      const SQL = await initSqlJs({
        // Required to load the wasm binary asynchronously
        locateFile: (file: string) => `https://sql.js.org/dist/${file}`
      });
      this.db = new SQL.Database(new Uint8Array(arrayBuffer));
    } catch (err) {
      console.error('Failed to initialize SQLite database:', err);
      throw err; // Rethrow to make the initialization promise reject
    }
  }

  private async ensureInitialized(): Promise<void> {
    await this.initialized;
    if (!this.db) {
      throw new Error('Database failed to initialize');
    }
  }

  public async getTableNames(): Promise<string[]> {
    await this.ensureInitialized();
    try {
      const result = this.db!.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
      console.log('Table query result:', result); // Debug log
      if (result.length === 0) return [];
      return result[0].values.flat() as string[];
    } catch (err) {
      console.error('Error getting table names:', err);
      return [];
    }
  }

  public async getTableInfo(tableName: string): Promise<TableInfo> {
    await this.ensureInitialized();
    const result = this.db!.exec(`SELECT sql FROM sqlite_master WHERE type='table' AND name='${tableName}'`);
    if (result.length === 0) throw new Error(`Table ${tableName} not found`);
    
    return {
      name: tableName,
      sql: result[0].values[0][0] as string
    };
  }

  public async getTableColumns(tableName: string): Promise<ColumnInfo[]> {
    await this.ensureInitialized();
    const result = this.db!.exec(`PRAGMA table_info(${tableName})`);
    if (result.length === 0) return [];
    
    const columns = result[0].columns;
    return result[0].values.map(row => {
      const columnInfo: any = {};
      columns.forEach((col, i) => {
        columnInfo[col] = row[i];
      });
      return columnInfo as ColumnInfo;
    });
  }

  public async getTableData(tableName: string): Promise<TableData> {
    await this.ensureInitialized();
    const result = this.db!.exec(`SELECT * FROM ${tableName} LIMIT 1000`);
    if (result.length === 0) {
      const columns = await this.getTableColumns(tableName);
      return { columns: columns.map(col => col.name), values: [] };
    }
    
    return {
      columns: result[0].columns,
      values: result[0].values
    };
  }

  public async executeQuery(sql: string): Promise<QueryResult> {
    await this.ensureInitialized();
    try {
      const result = this.db!.exec(sql);
      if (result.length === 0) {
        return { columns: [], values: [] };
      }
      
      return {
        columns: result[0].columns,
        values: result[0].values
      };
    } catch (err) {
      console.error('SQL execution error:', err);
      throw err;
    }
  }
}

// Factory function to create a new SQLiteService instance
export async function createSQLiteService(arrayBuffer: ArrayBuffer): Promise<SQLiteService> {
  const service = new SQLiteService(arrayBuffer);
  // Wait for initialization to complete without accessing the private property directly
  try {
    await service['initialized']; // Access via indexer to bypass private access restriction
    return service;
  } catch (err) {
    console.error('SQLite initialization error:', err);
    throw new Error('Failed to initialize SQLite database. Make sure it is a valid SQLite file.');
  }
} 