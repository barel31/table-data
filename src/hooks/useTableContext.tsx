import { useContext } from 'react';
import { TableContext } from '@/components/TableProvider';

/**
 * Custom hook that returns the current TableContext.
 * Throws an error if used outside of a TableProvider.
 *
 * @returns The current TableContext.
 * @throws Error if used outside of a TableProvider.
 */
export default function useTableContext() {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error('useTableContext must be used within a TableProvider');
  }

  return context;
}
