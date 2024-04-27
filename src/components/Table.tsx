import { useCallback, useMemo, useState } from 'react';
import { toggleFilteredColumn } from '@/services/table';
import { largeMockData } from '@/assets/tableMock';
import { MemoHiddenColumns } from './HiddenColumns';
import { MemoPageNavigation } from './PageNavigation';
import { MemoAddRow } from './AddRow';
import { MemoTableUi } from './TableUi';
import { MemoDebugButtons } from './DebugButtons';
import { SaveButton } from './SaveButton';

const itemsPerPage = 100;

export default function Table() {
  const [data, setData] = useState<TableData>(largeMockData);
  const [draft, setDraft] = useState<TableData>(
    JSON.parse(JSON.stringify(data))
  );
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { columns, data: rows } = draft;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = useMemo(
    () => rows?.slice(indexOfFirstItem, indexOfLastItem),
    [rows, indexOfFirstItem, indexOfLastItem]
  );

  const handleHideColumn = useCallback(
    (columnId: string) =>
      setHiddenColumns(prev => toggleFilteredColumn(prev, columnId)),
    []
  );

  const visibleColumns = useMemo(
    () =>
      columns
        ?.filter(column => !hiddenColumns.includes(column.id))
        .sort((a, b) => a.ordinalNo - b.ordinalNo),
    [columns, hiddenColumns]
  );

  return (
    <div className="table-data text-center">
      <MemoAddRow columns={columns} setDraft={setDraft} />
      <MemoHiddenColumns
        columns={columns}
        hiddenColumns={hiddenColumns}
        handleHideColumn={handleHideColumn}
      />
      <MemoTableUi
        visibleColumns={visibleColumns}
        currentItems={currentItems}
        handleHideColumn={handleHideColumn}
        setDraft={setDraft}
      />
      <MemoPageNavigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rows={rows}
        itemsPerPage={itemsPerPage}
      />
      <SaveButton draft={draft} setData={setData} />
      <MemoDebugButtons
        data={data}
        setDraft={setDraft}
        hiddenColumns={hiddenColumns}
        visibleColumns={visibleColumns}
      />
    </div>
  );
}
