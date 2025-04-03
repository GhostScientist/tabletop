import { useState } from 'react';

interface QueryEditorProps {
  onExecuteQuery: (sql: string) => void;
  isLoading?: boolean;
}

export function QueryEditor({ onExecuteQuery, isLoading = false }: QueryEditorProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onExecuteQuery(query);
    }
  };

  return (
    <div className="border border-black/10 dark:border-white/10 rounded-lg overflow-hidden">
      <div className="p-3 font-medium border-b border-black/10 dark:border-white/10">
        SQL Query
      </div>
      <form onSubmit={handleSubmit} className="p-3">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full h-32 p-3 border border-black/10 dark:border-white/10 rounded-md bg-transparent focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white resize-none font-mono text-sm"
          placeholder="SELECT * FROM table_name"
        />
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className={`
              px-4 py-2 font-medium rounded-md transition-colors
              ${isLoading 
                ? 'bg-black/30 text-white/70 dark:bg-white/30 dark:text-black/70 cursor-not-allowed' 
                : query.trim() 
                  ? 'bg-black text-white dark:bg-white dark:text-black' 
                  : 'bg-black/30 text-white/70 dark:bg-white/30 dark:text-black/70 cursor-not-allowed'}
            `}
          >
            {isLoading ? 'Running...' : 'Run Query'}
          </button>
        </div>
      </form>
    </div>
  );
} 