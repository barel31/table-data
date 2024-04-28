import { memo } from 'react';
import { inputPattern } from '@/helpers/table';

type Props = {
  column: TableColumn;
  row?: TableRow;
  handleUpdateCell: (
    column: TableColumn,
    row: TableRow,
    value: CellValue
  ) => void;
};

export default function Cell({ column, row, handleUpdateCell }: Props) {
  const { id, type, title, width } = column;
  return (
    <input
      id={`${row?.id ?? 0}-${id}`}
      type={row ? type : 'text'}
      defaultValue={String(row ? row[id] ?? '' : title)}
      className={`border-none text-slate-700 p-1 bg-transparent text-center ${
        row
          ? 'invalid:ring-2 invalid:ring-red-500 invalid:ring-opacity-50 invalid:bg-red-50'
          : 'text-slate-500'
      }`}
      style={{ width }}
      onChange={e => handleUpdateCell(column, row!, e.target.value)}
      pattern={row && inputPattern(type)}
    />
  );
}

export const MemoCell = memo(Cell);
