import { useCallback, useMemo, useState } from 'react';
import { toggleFilteredColumn } from '@/services/table';
import { largeMockData } from '@/assets/tableMock';
import { itemsPerPage } from '@/assets/constants';
import { MemoHiddenColumns } from './HiddenColumns';
import { MemoTableUi } from './TableUi';
import { MemoPageNavigation } from './PageNavigation';
import { MemoDebugButtons } from './DebugButtons';
import { MemoAddRow } from './AddRow';
import { MemoSaveButton } from './SaveButton';

export default function Table() {
  const [data, setData] = useState(largeMockData);
  const [changes, setChanges] = useState<TableData>({ columns: [], data: [] });
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { columns, data: rows } = data;

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
      <MemoAddRow columns={columns} setData={setData} />
      <MemoHiddenColumns
        columns={columns}
        hiddenColumns={hiddenColumns}
        handleHideColumn={handleHideColumn}
      />
      <MemoTableUi
        visibleColumns={visibleColumns}
        currentItems={currentItems}
        handleHideColumn={handleHideColumn}
        setChanges={setChanges}
        setData={setData}
      />
      <MemoPageNavigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rows={rows}
      />
      <MemoSaveButton
        setData={setData}
        changes={changes}
        setChanges={setChanges}
      />
      <MemoDebugButtons
        data={data}
        setData={setData}
        hiddenColumns={hiddenColumns}
        visibleColumns={visibleColumns}
        changes={changes}
      />
    </div>
  );
}
