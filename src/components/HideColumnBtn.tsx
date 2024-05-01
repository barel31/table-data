import { memo } from 'react';
import useTableContext from '@/hooks/useTableContext';
import { IconHideEyeClose } from '@/assets/icons';

export default function HideColumnBtn({ column }: { column: TableColumn }) {
  const { handleHideColumn } = useTableContext();

  return (
    <button
      className="block my-1 mx-auto"
      onClick={() => handleHideColumn(column.id)}
      title={`Hide ${column.title}`}>
      <IconHideEyeClose className="w-4" />
    </button>
  );
}

export const MemoHideColumnBtn = memo(HideColumnBtn);
