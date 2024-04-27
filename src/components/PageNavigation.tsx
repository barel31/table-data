import { type Dispatch, type SetStateAction, memo } from 'react';

type Props = {
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
  rows: TableRow[];
  itemsPerPage: number;
};

export function PageNavigation({
  setCurrentPage,
  currentPage,
  rows,
  itemsPerPage,
}: Props) {
  return (
    <div>
      <div className="flex justify-between w-2/3 mx-auto my-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}>
          Previous
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(rows?.length / itemsPerPage)}>
          Next
        </button>
      </div>
      <p className="text-center mt-4 text-gray-500">
        Page
        <input
          type="number"
          defaultValue={currentPage}
          className="w-10 text-center border border-gray-300 rounded-md mx-3"
          onChange={e => setCurrentPage(Number(e.target.value))}
        />
        of {Math.ceil(rows?.length / itemsPerPage)}
      </p>
    </div>
  );
}

export const MemoPageNavigation = memo(PageNavigation);
