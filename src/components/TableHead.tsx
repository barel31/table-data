import { memo } from 'react';
import useTableContext from '@/hooks/useTableContext';
import { MemoHideColumnBtn } from './HideColumnBtn';
import Cell from './Cell';
import { IconTrash } from '@/assets/icons';

type Props = {
  handleUpdateCell: (
    column: TableColumn,
    row: TableRow,
    value: CellValue
  ) => void;
};

export default function TableHead({ handleUpdateCell }: Props) {
  const { visibleColumns } = useTableContext();
  
  return (
    <thead>
      <tr>
        {visibleColumns.map(column => (
          <th
            key={column.id}
            style={{ width: column.width }}
            className="sticky top-0 bg-white z-10 shadow-sm">
            <Cell column={column} handleUpdateCell={handleUpdateCell} />
            <p className="text-xs text-slate-500 italic truncate relative bottom-1">
              {column.type}
            </p>
            <MemoHideColumnBtn column={column} />
          </th>
        ))}
        {visibleColumns.length && (
          <th className="sticky top-0 bg-white z-10 shadow-sm">
            <button disabled={true} className="p-2" title="Delete Row">
              <IconTrash className="w-6 h-6" />
            </button>
          </th>
        )}
      </tr>
    </thead>
  );
}

export const MemoTableHead = memo(TableHead);
