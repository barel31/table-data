import { type Dispatch, type SetStateAction, memo } from 'react';
import { inputPattern } from '@/helpers/table';
import { addNewRow } from '@/services/table';

export function AddRow({
  columns,
  setData,
}: {
  columns: TableColumn[];
  setData: Dispatch<SetStateAction<TableData>>;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setData((prev) => addNewRow(prev, e));
  };

  return (
    <div className="add-row my-4 mx-auto p-2 w-fit">
      <h1>Add Row to Table:</h1>
      <form
        action="#"
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 bg-gray-200 p-4 rounded-lg">
        {columns?.map((column) => (
          <div className="flex gap-2 justify-start" key={column.id}>
            <label htmlFor={column.id} className="w-20 text-left">
              {column.title}:
            </label>
            <input
              id={column.id}
              name={column.id}
              type={column.type}
              placeholder={column.title}
              className="p-1 rounded-md border border-gray-300 w-40"
              pattern={inputPattern(column.type)}
            />
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md w-full">
          Add
        </button>
      </form>
    </div>
  );
}

export const MemoAddRow = memo(AddRow);
