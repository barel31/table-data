import { clearRows } from '@/services/table';
import { type Dispatch, type SetStateAction, memo } from 'react';

export function DebugButtons({
  data,
  setData,
  filtered,
}: {
  data: TableData;
  setData: Dispatch<SetStateAction<TableData>>;
  filtered: any;
}) {
  const handleClickClear = () => {
    setData((prev) => clearRows(prev));
  };

  const handleClickPrint = () => {
    console.log(data);
    console.log(filtered);
  };

  return (
    <div className="text-center m-12">
      <button className="border p-5" onClick={handleClickClear}>
        CLEAR ROWS
      </button>
      <button className="border p-5" onClick={handleClickPrint}>
        PRINT DATA
      </button>
    </div>
  );
}

export const MemoDebugButtons = memo(DebugButtons);
