import { type Dispatch, type SetStateAction, memo } from 'react';
import { itemsPerPage } from '@/assets/constants';

type Props = {
  currentPage: number;
  rows: TableRow[];
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

export default function PageNavigation({
  currentPage,
  rows,
  setCurrentPage,
}: Props) {
  const lastPage = Math.ceil(rows?.length / itemsPerPage);

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const pageNumber = Number(e.currentTarget.value);
      changePage(pageNumber);
    }
  };

  const changePage = (value: number) => {
    if (value >= 1 && value <= lastPage) {
      setCurrentPage(value);
    }
  };

  return (
    <div>
      <div className="flex justify-between md:w-2/3 px-2 mx-auto my-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          title="Go to the previous page.">
          Previous
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === lastPage}
          title="Go to the next page.">
          Next
        </button>
      </div>
      <p className="text-center mt-4 text-gray-500">
        Page
        <input
          type="number"
          defaultValue={currentPage}
          className="w-10 text-center border border-gray-300 rounded-md mx-3"
          onKeyDown={handleOnKeyDown}
          onBlur={e => changePage(Number(e.currentTarget.value))}
          title='Enter a page number and press "Enter" to navigate to that page.'
        />
        of {lastPage}
      </p>
    </div>
  );
}

export const MemoPageNavigation = memo(PageNavigation);
