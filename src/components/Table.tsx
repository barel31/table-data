import { MemoAddRow } from './AddRow';
import { MemoHiddenColumns } from './HiddenColumns';
import { MemoTableUi } from './TableUi';
import { MemoPageNavigation } from './PageNavigation';
import { MemoSaveButton } from './SaveButton';
import { MemoDebugButtons } from './DebugButtons';

export default function Table() {
  return (
    <div className="table-data text-center">
      <MemoAddRow />
      <MemoHiddenColumns />
      <MemoTableUi />
      <MemoPageNavigation />
      <MemoSaveButton />
      <MemoDebugButtons />
    </div>
  );
}
