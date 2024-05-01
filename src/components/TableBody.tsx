import { memo, useCallback } from 'react';
import useTableContext from '@/hooks/useTableContext';
import { deleteRow } from '@/services/table';
import Cell from './Cell';
import { IconTrash } from '@/assets/icons';

type Props = {
  handleUpdateCell: (
    column: TableColumn,
    row: TableRow,
    value: CellValue
  ) => void;
};

export default function TableBody({ handleUpdateCell }: Props) {
  const { visibleColumns, currentItems, setData } = useTableContext();

  const handleDeleteRow = useCallback(
    (rowId: string) => setData(prev => deleteRow(prev, rowId)),
    [setData]
  );

  return (
    <tbody>
      {currentItems?.map(row => (
        <tr key={row.id} className="border-b even:bg-gray-50">
          {visibleColumns.map(column => (
            <td key={`${column.id}-${row.id}`}>
              <Cell
                column={column}
                row={row}
                handleUpdateCell={handleUpdateCell}
              />
            </td>
          ))}
          {visibleColumns.length && (
            <td>
              <button
                onClick={() => handleDeleteRow(row.id)}
                className="m-1 p-1 fill-red-500 hover:fill-red-700 transition-transform bg-red-50 hover:bg-red-200 rounded-md
              shadow-sm hover:shadow-md active:shadow-none active:translate-y-0.5 active:bg-red-300 active:fill-red-700">
                <IconTrash className="w-6 h-6 p-0.5" />
              </button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
}

export const MemoTableBody = memo(TableBody);
