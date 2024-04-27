import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  memo,
  useMemo,
} from 'react';
import { MemoHideColumnBtn } from './HideColumnBtn';
import { deleteRow, updateCellValue } from '@/services/table';
import { Cell } from './Cell';
import { IconTrash } from '@/assets/icons';

type Props = {
  visibleColumns: TableColumn[];
  currentItems: TableRow[];
  handleHideColumn: (columnId: string) => void;
  setDraft: Dispatch<SetStateAction<TableData>>;
};

export function TableUi({
  visibleColumns,
  currentItems,
  handleHideColumn,
  setDraft,
}: Props) {
  const updateCell = useCallback(
    (column: TableColumn, row: TableRow, value: CellValue) =>
      setDraft(prev => updateCellValue(prev!, column, row, value)),
    [setDraft]
  );

  const handleRemoveRow = useCallback(
    (rowId: string) => setDraft(prev => deleteRow(prev!, rowId)),
    [setDraft]
  );

  const tableHeader = useMemo(() => {
    return (
      <tr>
        {visibleColumns.map(column => (
          <th
            key={column.id}
            style={{ width: column.width }}
            className="sticky top-0 bg-white z-10 shadow-sm">
            <Cell column={column} updateCell={updateCell} />
            <p className="text-xs text-slate-500 italic truncate relative bottom-1">
              {column.type}
            </p>
            <MemoHideColumnBtn
              column={column}
              handleHideColumn={handleHideColumn}
            />
          </th>
        ))}
        <th className="sticky top-0 bg-white z-10 shadow-sm">
          <button disabled={true} className="p-2">
            <IconTrash className="w-6 h-6" />
          </button>
        </th>
      </tr>
    );
  }, [visibleColumns, handleHideColumn, updateCell]);

  const renderRow = useMemo(() => {
    return currentItems?.map(row => (
      <tr key={row.id + Date.now()} className="border-b even:bg-gray-50">
        {visibleColumns.map(column => (
          <td key={column.id}>
            <Cell column={column} row={row} updateCell={updateCell} />
          </td>
        ))}
        <td>
          <button
            onClick={() => handleRemoveRow(row.id)}
            className="p-2 fill-red-500 hover:fill-red-700">
            <IconTrash className="w-6 h-6" />
          </button>
        </td>
      </tr>
    ));
  }, [currentItems, visibleColumns, updateCell, handleRemoveRow]);

  return (
    <div className="overflow-auto h-[65vh] w-fit max-w-full m-auto">
      <table>
        <thead>{tableHeader}</thead>
        <tbody>{renderRow}</tbody>
      </table>
    </div>
  );
}

export const MemoTableUi = memo(TableUi);
