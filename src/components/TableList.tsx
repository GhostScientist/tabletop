interface TableListProps {
  tables: string[];
  activeTable: string | null;
  onSelectTable: (tableName: string) => void;
}

export function TableList({ tables, activeTable, onSelectTable }: TableListProps) {
  if (tables.length === 0) {
    return (
      <div className="p-4 border border-black/10 dark:border-white/10 rounded-lg">
        <p className="text-sm opacity-70">No tables found in database</p>
      </div>
    );
  }

  return (
    <div className="border border-black/10 dark:border-white/10 rounded-lg overflow-hidden">
      <h2 className="p-3 font-medium border-b border-black/10 dark:border-white/10">
        Database Tables
      </h2>
      <ul className="divide-y divide-black/10 dark:divide-white/10">
        {tables.map(tableName => (
          <li 
            key={tableName}
            className={`
              px-3 py-2 cursor-pointer transition-colors duration-100
              ${activeTable === tableName 
                ? 'bg-black text-white dark:bg-white dark:text-black' 
                : 'hover:bg-black/5 dark:hover:bg-white/5'}
            `}
            onClick={() => onSelectTable(tableName)}
          >
            {tableName}
          </li>
        ))}
      </ul>
    </div>
  );
} 