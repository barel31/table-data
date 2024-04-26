import { IconHideEyeClose } from '@/assets/icons';
import { memo } from 'react';

export const HideColumnBtn = function HideColumnBtn({
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
      title="Hide">
      <IconHideEyeClose className="w-4" />
    </button>
  );
};

export const MemoHideColumnBtn = memo(HideColumnBtn);
