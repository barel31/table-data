import { useCallback, useEffect, useMemo, useState } from 'react';
import { toggleFilteredColumn } from '@/services/table';
import { largeMockData } from '@/assets/tableMock';
import { MemoFilteredColumns } from './FilteredColumns';
import { MemoPageNavigation } from './PageNavigation';
import { MemoAddRow } from './AddRow';
import { TableUi } from './TableUi';
import { MemoButtons } from './MemoButtons';

const itemsPerPage = 100;

export default function Table() {
  const [data, setData] = useState<TableData>(largeMockData);
  const [filteredColumns, setFilteredColumns] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<TableColumn[]>([]);
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
      setFilteredColumns((prev) => toggleFilteredColumn(prev, columnId)),
    []
  );

  useEffect(() => {
    const visibleColumns = columns?.filter(
      (column) => !filteredColumns.includes(column.id)
    );
    setVisibleColumns(visibleColumns.sort((a, b) => a.ordinalNo - b.ordinalNo));
  }, [columns, filteredColumns]);

  return (
    <div className="table-data text-center">
      <MemoFilteredColumns
        columns={columns}
        filtered={filteredColumns}
        handleHide={handleHideColumn}
      />
      <TableUi
        visibleColumns={visibleColumns}
        currentItems={currentItems}
        handleHideColumn={handleHideColumn}
        setData={setData}
      />
      <MemoPageNavigation
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rows={rows}
        itemsPerPage={itemsPerPage}
      />
      <MemoAddRow columns={columns} setData={setData} />
      <MemoButtons data={data} setData={setData} filtered={filteredColumns} />
    </div>
  );
}
