import { useCallback, memo, useRef } from 'react';
import useTableContext from '@/hooks/useTableContext';
import useDebounced from '@/hooks/useDebounced';
import { updateCellValue } from '@/services/table';
import { MemoTableHead } from './TableHead';
import { MemoTableBody } from './TableBody';

export default function TableUi() {
  const { visibleColumns, currentItems, setChanges } = useTableContext();

  const pendingChanges = useRef<PendingChange[]>([]);

  const debouncedSetChanges = useDebounced(() => {
    pendingChanges.current.forEach(change => {
      const { column, row, value } = change;
      setChanges(prev => updateCellValue(prev, column!, row!, value));
    });
    pendingChanges.current = [];
  }, 1000);

  const handleUpdateCell = useCallback(
    (column: TableColumn, row: TableRow, value: CellValue) => {
      const existingChange = pendingChanges.current.find(
        change => change.column === column && change.row === row
      );
      if (existingChange) {
        existingChange.value = value;
        return;
      }
      pendingChanges.current.push({ column, row, value });
      debouncedSetChanges();
    },
    [pendingChanges, debouncedSetChanges]
  );

  if (!currentItems?.length || !visibleColumns?.length) {
    return (
      <p className="text-center m-20 text-gray-500">No data to display.</p>
    );
  }

  return (
    <div className="overflow-auto h-[65vh] w-fit max-w-full m-auto border">
      <table>
        <MemoTableHead handleUpdateCell={handleUpdateCell} />
        <MemoTableBody handleUpdateCell={handleUpdateCell} />
      </table>
    </div>
  );
}

export const MemoTableUi = memo(TableUi);
