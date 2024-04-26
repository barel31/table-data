import { type Dispatch, type SetStateAction, useCallback, memo } from 'react';
import { MemoHideColumnBtn } from './HideColumnBtn';
import { changeValue } from '@/services/table';
import { inputPattern } from '@/helpers/table';

export function TableUi({
  visibleColumns,
  currentItems,
  handleHideColumn,
  setData,
}: {
  visibleColumns: TableColumn[];
  currentItems: TableRow[];
  handleHideColumn: (columnId: string) => void;
  setData: Dispatch<SetStateAction<TableData>>;
}) {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, isColumn = false) =>
      setData((prev) => changeValue(e, prev, isColumn)),
    [setData]
  );

  return (
    <div className="overflow-auto h-[65vh] w-fit max-w-full m-auto">
      <table>
        <thead>
          <tr>
            {visibleColumns.map((column) => (
              <th
                key={column.id}
                style={{ width: column.width }}
                className="sticky top-0 bg-white z-10 shadow-sm">
                <input
                  id={`0-${column.id}`}
                  type="text"
                  defaultValue={column.title}
                  className="border-none text-slate-700 p-1 bg-transparent text-center"
                  style={{ width: column.width }}
                  onChange={(e) => handleInputChange(e, true)}
                />
                <p className="text-xs text-slate-500 italic truncate relative bottom-1">
                  {column.type}
                </p>
                <MemoHideColumnBtn
                  column={column}
                  handleHideColumn={handleHideColumn}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((row) => (
            <tr key={row.id + Date.now()} className="border-b even:bg-gray-50">
              {visibleColumns.map((column) => (
                <td key={column.id}>
                  <input
                    id={`${row.id}-${column.id}`}
                    type={column.type}
                    defaultValue={String(row[column.id])}
                    className="border-none text-slate-700 p-2 bg-transparent text-center invalid:bg-red-100 truncate"
                    onChange={handleInputChange}
                    style={{ width: column.width }}
                    pattern={inputPattern(column.type)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const MemoTableUi = memo(TableUi);
