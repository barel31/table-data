import { type Dispatch, type SetStateAction, useCallback } from 'react';
import { MemoHideColumnBtn } from './HideColumnBtn';
import { changeValue } from '@/services/table';
import { inputPattern } from '@/helpers/table';

export default function TableUi({
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
    <div className="overflow-auto h-[65vh]">
      <table>
        <thead>
          <tr>
            {visibleColumns.map((column) => (
              <th
                key={column.id}
                style={{ width: column.width }}
                className="sticky top-0 bg-white z-10 shadow-md">
                <input
                  name={column.id}
                  type="text"
                  defaultValue={column.title}
                  className="border-none text-slate-700 p-2 bg-transparent text-center"
                  style={{ width: column.width }}
                  onChange={(e) => handleInputChange(e, true)}
                />
                <MemoHideColumnBtn
                  column={column}
                  handleHideColumn={handleHideColumn}
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((row) => (
            <tr key={row.id} className="border-b">
              {visibleColumns.map((column) => (
                <td key={column.id} className="px-4 py-2">
                  <input
                    name={column.id}
                    id={row.id}
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
