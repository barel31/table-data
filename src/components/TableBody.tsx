import { memo } from 'react';
import { IconTrash } from '@/assets/icons';
import Cell from './Cell';

type Props = {
  currentItems: TableRow[];
  visibleColumns: TableColumn[];
  handleUpdateCell: (
    column: TableColumn,
    row: TableRow,
    value: CellValue
  ) => void;
  handleDeleteRow: (rowId: string) => void;
};

export default function TableBody({
  currentItems,
  visibleColumns,
  handleUpdateCell,
  handleDeleteRow,
}: Props) {
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
          {visibleColumns.length ? (
            <td>
              <button
                onClick={() => handleDeleteRow(row.id)}
                className="m-1 p-1 fill-red-500 hover:fill-red-700 transition-transform bg-red-50 hover:bg-red-200 rounded-md
              shadow-sm hover:shadow-md active:shadow-none active:translate-y-0.5 active:bg-red-300 active:fill-red-700">
                <IconTrash className="w-6 h-6 p-0.5" />
              </button>
            </td>
          ) : null}
        </tr>
      ))}
    </tbody>
  );
}

export const MemoTableBody = memo(TableBody);
