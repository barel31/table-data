import { memo } from 'react';

export function PageNavigation({
  setCurrentPage,
  currentPage,
  data,
  itemsPerPage,
}: {
  setCurrentPage: Function;
  currentPage: number;
  data: TableData;
  itemsPerPage: number;
}) {
  return (
    <div>
      <div className="flex justify-between m-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}>
          Previous
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(data.data.length / itemsPerPage)}>
          Next
        </button>
      </div>
      <p className="text-center mt-4 text-gray-500">
        Page{' '}
        <input
          type="number"
          defaultValue={currentPage}
          className="w-10 text-center border border-gray-300 rounded-md"
          onChange={(e) => setCurrentPage(Number(e.target.value))}
        />{' '}
        of {Math.ceil(data.data.length / itemsPerPage)}
      </p>
    </div>
  );
}

export const MemoPageNavigation = memo(PageNavigation);
