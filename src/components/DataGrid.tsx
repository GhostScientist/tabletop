import { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ClientSideRowModelModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { TableData } from '../types';

interface DataGridProps {
  data: TableData;
  title?: string;
}

export function DataGrid({ data, title }: DataGridProps) {
  const columnDefs = useMemo(() => {
    return data.columns.map(col => ({
      headerName: col,
      field: col,
      sortable: true,
      filter: true,
      resizable: true,
    }));
  }, [data.columns]);

  const rowData = useMemo(() => {
    return data.values.map(row => {
      const rowObj: Record<string, any> = {};
      data.columns.forEach((col, index) => {
        rowObj[col] = row[index];
      });
      return rowObj;
    });
  }, [data.values, data.columns]);

  // Custom styles to match our black and white theme
  const gridTheme = {
    '--ag-background-color': 'transparent',
    '--ag-header-background-color': '#000000',
    '--ag-header-foreground-color': '#ffffff',
    '--ag-odd-row-background-color': 'rgba(0, 0, 0, 0.03)',
    '--ag-row-hover-color': 'rgba(0, 0, 0, 0.1)',
    '--ag-selected-row-background-color': 'rgba(0, 0, 0, 0.2)',
    '--ag-border-color': 'rgba(0, 0, 0, 0.2)',
  };

  const darkGridTheme = {
    '--ag-background-color': 'transparent',
    '--ag-header-background-color': '#ffffff',
    '--ag-header-foreground-color': '#000000',
    '--ag-odd-row-background-color': 'rgba(255, 255, 255, 0.03)',
    '--ag-row-hover-color': 'rgba(255, 255, 255, 0.1)', 
    '--ag-selected-row-background-color': 'rgba(255, 255, 255, 0.2)',
    '--ag-border-color': 'rgba(255, 255, 255, 0.2)',
  };

  if (data.values.length === 0) {
    return (
      <div className="border border-black/10 dark:border-white/10 rounded-lg p-4">
        <div className="font-medium mb-2">{title || 'Data'}</div>
        <p className="text-sm opacity-70">No data available</p>
      </div>
    );
  }

  return (
    <div className="border border-black/10 dark:border-white/10 rounded-lg overflow-hidden">
      <div className="p-3 font-medium border-b border-black/10 dark:border-white/10">
        {title || 'Data'} ({rowData.length} rows)
      </div>
      <div 
        className="w-full h-96 ag-theme-alpine" 
        style={gridTheme as React.CSSProperties}
      >
        <AgGridReact
          modules={[ClientSideRowModelModule]}
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={{
            flex: 1,
            minWidth: 100,
          }}
          pagination={true}
          paginationPageSize={100}
        />
      </div>
    </div>
  );
} 