import { clearRows } from '@/services/table';
import { type Dispatch, type SetStateAction, memo } from 'react';

type Props = {
  data: TableData;
  hiddenColumns: string[];
  visibleColumns: TableColumn[];
  changes: TableData;
  setData: Dispatch<SetStateAction<TableData>>;
};

export default function DebugButtons({
  data,
  hiddenColumns,
  visibleColumns,
  changes,
  setData,
}: Props) {
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
