import { clearRows } from '@/services/table';
import { type Dispatch, type SetStateAction, memo } from 'react';

type Props = {
  data: TableData;
  setDraft: Dispatch<SetStateAction<TableData>>;
  hiddenColumns: string[];
  visibleColumns: TableColumn[];
};

export function DebugButtons({
  data,
  setDraft,
  hiddenColumns,
  visibleColumns,
}: Props) {
  const handleClickClear = () => {
    setDraft(prev => clearRows(prev));
  };

  const handleClickPrint = () => {
    console.log('Table data', data);
    console.log('Hidden columns', hiddenColumns);
    console.log('Visible columns', visibleColumns);
  };

  return (
    <div className="text-center m-12">
      <button className="border p-5" onClick={handleClickClear}>
        CLEAR ROWS
      </button>
      <button className="border p-5" onClick={handleClickPrint}>
        CONSOLE DATA
      </button>
    </div>
  );
}

export const MemoDebugButtons = memo(DebugButtons);
