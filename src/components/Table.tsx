import { useCallback, useEffect, useState } from 'react';
import { toggleFilteredColumn } from '@/services/table';
import { largeMockData } from '@/assets/tableMock';
import { MemoPrintBtn } from './PrintBtn';
import { MemoFilteredColumns } from './FilteredColumns';
import { MemoPageNavigation } from './PageNavigation';
import { MemoAddRow } from './AddRow';
import TableUi from './TableUi';

const itemsPerPage = 100;

export default function Table() {
  const [data, setData] = useState<TableData>(largeMockData);
  const [filteredColumns, setFilteredColumns] = useState<string[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<TableColumn[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last items on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Select only the items for the current page
  const currentItems = data.data.slice(indexOfFirstItem, indexOfLastItem);

  const handleHideColumn = useCallback(
    (columnId: string) =>
      setFilteredColumns((prev) => toggleFilteredColumn(prev, columnId)),
    []
  );

  useEffect(() => {
    const visibleColumns = data.columns.filter(
      (column) => !filteredColumns.includes(column.id)
    );
    setVisibleColumns(visibleColumns);
  }, [data.columns, filteredColumns]);

  return (
    <div className="table-data text-center">
      <MemoFilteredColumns
        data={data}
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
        data={data}
        itemsPerPage={itemsPerPage}
      />
      <MemoAddRow columns={data.columns} setData={setData} />
      <MemoPrintBtn data={data} filtered={filteredColumns} />
    </div>
  );
}
