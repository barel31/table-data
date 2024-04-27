import { inputPattern } from '@/helpers/table';

type Props = {
  column: TableColumn;
  row?: TableRow;
  updateCell?: (
    column: TableColumn,
    row: TableRow,
    value: CellValue
  ) => void;
};

export function Cell({ column, row, updateCell }: Props) {
  return (
    <input
      id={`${row?.id ?? 0}-${column.id}`}
      type={row ? column.type : 'text'}
      defaultValue={String(row ? row[column.id] ?? '' : column.title)}
      className="border-none text-slate-700 p-1 bg-transparent text-center"
      style={{ width: column.width }}
      onBlur={e => updateCell!(column, row!, e.target.value)}
      pattern={row && inputPattern(column.type)}
    />
  );
}
