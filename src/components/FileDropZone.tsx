import { useFileDrop } from '../hooks/useFileDrop';
import { useRef } from 'react';

interface FileDropZoneProps {
  onFileDrop: (file: File) => void;
}

export function FileDropZone({ onFileDrop }: FileDropZoneProps) {
  const { isDragging, fileDropRef, handleFileDrop, activeFile } = useFileDrop();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set up the file drop callback
  handleFileDrop(onFileDrop);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileDrop(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      ref={fileDropRef}
      onClick={handleClick}
      className={`
        w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6
        transition-colors duration-200 cursor-pointer
        ${isDragging 
          ? 'border-black bg-black/5 dark:border-white dark:bg-white/5' 
          : 'border-black/20 dark:border-white/20'}
      `}
    >
      <input 
        type="file"
        ref={fileInputRef}
        onChange={handleFileInputChange}
        accept=".sqlite,.db,.sqlite3"
        className="hidden"
      />
      <div className="text-center">
        {activeFile ? (
          <div className="space-y-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 mx-auto" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
            <h3 className="text-lg font-medium">File loaded successfully</h3>
            <p className="text-sm opacity-70">{activeFile.name}</p>
          </div>
        ) : (
          <div className="space-y-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 mx-auto" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
              />
            </svg>
            <h3 className="text-lg font-medium">Drop your SQLite file here</h3>
            <p className="text-sm opacity-70">or click to select a file</p>
          </div>
        )}
      </div>
    </div>
  );
} 