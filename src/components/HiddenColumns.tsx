import { IconEyeOpen } from '@/assets/icons';
import { memo, useMemo } from 'react';

type Props = {
  columns: TableColumn[];
  hiddenColumns: String[];
  handleHideColumn: (columnId: string) => void;
};

export default function HiddenColumns({
  columns,
  hiddenColumns,
  handleHideColumn,
}: Props) {
  const columnTitles = useMemo(
    () =>
      columns
        ?.filter(column => hiddenColumns.includes(column.id))
        .map(column => ({ id: column.id, title: column.title })),
    [columns, hiddenColumns]
  );

  return (
    <div className="hidden-columns m-auto md:w-1/2 p-2 max-w-full text-left">
      <h1>Hidden Columns:</h1>
      <div className="flex flex-row justify-start m-auto gap-4 overflow-x-auto">
        {!columnTitles?.length ? (
          <p className="text-gray-500 mb-8">No columns hidden.</p>
        ) : (
          columnTitles?.map(column => (
            <button
              key={column.id}
              onClick={() => handleHideColumn(column.id)}
              className="flex flex-col justify-center items-center p-2 bg-gray-200 rounded-md"
              title={`Show ${column.title}`}>
              {column.title}
              <IconEyeOpen className="w-4 mx-auto" />
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export const MemoHiddenColumns = memo(HiddenColumns);
