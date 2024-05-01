import { memo } from 'react';
import useTableContext from '@/hooks/useTableContext';
import { clearRows } from '@/services/table';

export default function DebugButtons() {
  const { data, hiddenColumns, visibleColumns, changes, setData } =
    useTableContext();

  const handleClickClear = () => {
    setData(prev => clearRows(prev));
  };

  const handleClickPrint = () => {
    console.log('Table data', data);
    console.log('Hidden columns', hiddenColumns);
    console.log('Visible columns', visibleColumns);
    console.log('Changes', changes);
  };

  return (
    <div className="text-center m-12">
      <button
        className="border p-5 m-1 w-44"
        onClick={handleClickClear}
        title="Clear all rows from the table.">
        CLEAR ROWS
      </button>
      <button
        className="border p-5 m-1 w-44"
        onClick={handleClickPrint}
        title="Print the table data to the console.">
        CONSOLE DATA
      </button>
    </div>
  );
}

export const MemoDebugButtons = memo(DebugButtons);
