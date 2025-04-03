import { useState, useRef, useEffect, DragEvent } from 'react';

interface UseFileDropResult {
  isDragging: boolean;
  fileDropRef: React.RefObject<HTMLDivElement>;
  handleFileDrop: (callback: (file: File) => void) => void;
  activeFile: File | null;
}

export function useFileDrop(): UseFileDropResult {
  const [isDragging, setIsDragging] = useState(false);
  const [activeFile, setActiveFile] = useState<File | null>(null);
  const fileDropRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef<((file: File) => void) | null>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Check if the drop target is not a child of the drop zone
    if (e.currentTarget.contains(e.relatedTarget as Node)) {
      return;
    }
    
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setActiveFile(file);
      
      if (callbackRef.current) {
        callbackRef.current(file);
      }
    }
  };

  useEffect(() => {
    const dropArea = fileDropRef.current;
    if (!dropArea) return;
    
    const dragEnter = handleDragEnter as unknown as EventListener;
    const dragLeave = handleDragLeave as unknown as EventListener;
    const dragOver = handleDragOver as unknown as EventListener;
    const drop = handleDrop as unknown as EventListener;
    
    dropArea.addEventListener('dragenter', dragEnter);
    dropArea.addEventListener('dragleave', dragLeave);
    dropArea.addEventListener('dragover', dragOver);
    dropArea.addEventListener('drop', drop);
    
    return () => {
      dropArea.removeEventListener('dragenter', dragEnter);
      dropArea.removeEventListener('dragleave', dragLeave);
      dropArea.removeEventListener('dragover', dragOver);
      dropArea.removeEventListener('drop', drop);
    };
  }, []);

  const handleFileDrop = (callback: (file: File) => void) => {
    callbackRef.current = callback;
  };

  return {
    isDragging,
    fileDropRef,
    handleFileDrop,
    activeFile,
  };
} 