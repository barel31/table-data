import { IconHideEyeClose } from '@/assets/icons';
import { memo } from 'react';

export default function HideColumnBtn({
  column,
  handleHideColumn,
}: {
  column: TableColumn;
  handleHideColumn: (columnId: string) => void;
}) {
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
