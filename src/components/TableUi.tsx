import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  memo,
  useRef,
} from 'react';
import { deleteRow, updateCellValue } from '@/services/table';
import useDebounced from '@/hooks/useDebounced';
import { MemoTableHead } from './TableHead';
import { MemoTableBody } from './TableBody';

type Props = {
  visibleColumns: TableColumn[];
  currentItems: TableRow[];
  handleHideColumn: (columnId: string) => void;
  setChanges: Dispatch<SetStateAction<TableData>>;
  setData: Dispatch<SetStateAction<TableData>>;
};

export default function TableUi({
  visibleColumns,
  currentItems,
  handleHideColumn,
  setChanges,
  setData,
}: Props) {
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
      pendingChanges.current.push({ column, row, value });
      debouncedSetChanges();
    },
    [pendingChanges, debouncedSetChanges]
  );

  const handleDeleteRow = useCallback(
    (rowId: string) => setData(prev => deleteRow(prev, rowId)),
    [setData]
  );

  if (!currentItems.length || !visibleColumns.length) {
    return <p className="text-center m-20 text-gray-500">No data to display.</p>;
  }
  
  return (
    <div className="overflow-auto h-[65vh] w-fit max-w-full m-auto border">
      <table>
        <MemoTableHead
          visibleColumns={visibleColumns}
          handleUpdateCell={handleUpdateCell}
          handleHideColumn={handleHideColumn}
        />
        <MemoTableBody
          currentItems={currentItems}
          visibleColumns={visibleColumns}
          handleUpdateCell={handleUpdateCell}
          handleDeleteRow={handleDeleteRow}
        />
      </table>
    </div>
  );
}

export const MemoTableUi = memo(TableUi);
