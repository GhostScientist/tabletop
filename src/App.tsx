import { useState } from 'react'
import { createSQLiteService } from './utils/sqliteService'
import { Database, TableData, QueryResult } from './types'
import { FileDropZone } from './components/FileDropZone'
import { TableList } from './components/TableList'
import { QueryEditor } from './components/QueryEditor'
import { DataGrid } from './components/DataGrid'
import './App.css'

function App() {
  const [database, setDatabase] = useState<Database | null>(null)
  const [tables, setTables] = useState<string[]>([])
  const [activeTable, setActiveTable] = useState<string | null>(null)
  const [tableData, setTableData] = useState<TableData>({ columns: [], values: [] })
  const [queryResult, setQueryResult] = useState<QueryResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileDrop = async (file: File) => {
    try {
      setIsLoading(true)
      setError(null)
      
      // Read the file
      const arrayBuffer = await file.arrayBuffer()
      
      // Create SQLite service
      const sqliteService = await createSQLiteService(arrayBuffer)
      setDatabase(sqliteService)
      
      // Get table names
      const tableNames = await sqliteService.getTableNames()
      console.log('Tables found:', tableNames)
      setTables(tableNames)
      
      // Select first table if available
      if (tableNames.length > 0) {
        await handleSelectTable(tableNames[0])
      }
    } catch (err) {
      setError('Failed to load database file. Make sure it\'s a valid SQLite file.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectTable = async (tableName: string) => {
    if (!database) return
    
    try {
      setIsLoading(true)
      setActiveTable(tableName)
      setQueryResult(null)
      const data = await database.getTableData(tableName)
      setTableData(data)
    } catch (err) {
      setError(`Failed to load table: ${tableName}`)
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleExecuteQuery = async (sql: string) => {
    if (!database) return
    
    try {
      setIsLoading(true)
      setError(null)
      const result = await database.executeQuery(sql)
      setQueryResult(result)
    } catch (err: any) {
      setError(`SQL Error: ${err.message}`)
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-black dark:bg-black dark:text-white">
      <header className="border-b border-black/10 dark:border-white/10">
        <div className="tabletop-container py-4">
          <h1 className="text-2xl font-bold">Tabletop</h1>
          <p className="text-sm opacity-70">Local-first SQLite viewer</p>
        </div>
      </header>

      <main className="flex-grow tabletop-container py-8">
        {!database ? (
          <div className="max-w-lg mx-auto">
            <h2 className="text-xl font-semibold mb-4">Load a SQLite Database</h2>
            <FileDropZone onFileDrop={handleFileDrop} />
            
            <div className="mt-4 text-center text-sm">
              <p className="mb-2">Need a sample database file?</p>
              <a 
                href="https://www.sqlitetutorial.net/wp-content/uploads/2018/03/chinook.zip" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-black/70 dark:hover:text-white/70"
              >
                Download Chinook sample database
              </a>
            </div>
            
            {error && (
              <div className="mt-4 p-3 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 rounded-md">
                {error}
              </div>
            )}
            
            {isLoading && (
              <div className="mt-4 text-center">
                <p>Loading database...</p>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <TableList 
                tables={tables} 
                activeTable={activeTable} 
                onSelectTable={handleSelectTable} 
              />
            </div>
            
            <div className="md:col-span-3 space-y-6">
              {activeTable && (
                <DataGrid 
                  data={tableData} 
                  title={`Table: ${activeTable}`} 
                />
              )}
              
              <QueryEditor 
                onExecuteQuery={handleExecuteQuery} 
                isLoading={isLoading} 
              />
              
              {queryResult && (
                <DataGrid 
                  data={queryResult} 
                  title="Query Result" 
                />
              )}
              
              {error && (
                <div className="p-3 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 rounded-md">
                  {error}
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-black/10 dark:border-white/10">
        <div className="tabletop-container py-4">
          <p className="text-xs opacity-70">
            Tabletop - A local-first SQLite database viewer
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
