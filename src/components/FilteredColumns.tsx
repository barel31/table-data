import { IconEyeOpen } from '@/assets/icons';
import { memo, useMemo } from 'react';

export const FilteredColumns = function FilteredColumns({
  columns,
  filtered,
  handleHide,
}: {
  columns: TableColumn[];
  filtered: String[];
  handleHide: Function;
}) {
  const columnTitles = useMemo(
    () =>
      columns
        .filter((column) => filtered.includes(column.id))
        .map((column) => ({ id: column.id, title: column.title })),
    [columns, filtered]
  );

  const handleClick = (columnId: string) => handleHide(columnId);

  return (
    <div className="filtered-columns m-12 text-left">
      <h1>Hidden Columns:</h1>
      <div className="flex flex-row justify-start m-auto gap-4 overflow-x-auto">
        {!columnTitles.length ? (
          <p className="text-gray-500 mb-8">No columns hidden.</p>
        ) : (
          columnTitles.map((column, i) => (
            <button
              key={i}
              onClick={() => handleClick(column.id)}
              className="flex flex-col justify-center items-center p-2 bg-gray-200 rounded-md"
              title="Show">
              {column.title}
              <IconEyeOpen className="w-4 mx-auto" />
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export const MemoFilteredColumns = memo(FilteredColumns);
