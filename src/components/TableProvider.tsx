import { createContext, useState, useCallback, useMemo } from 'react';
import { largeMockData } from '@/assets/tableMock';
import { itemsPerPage } from '@/assets/constants';
import { toggleFilteredColumn } from '@/services/table';

interface TableContextProps {
  data: TableData;
  changes: TableData;
  columns: TableColumn[];
  visibleColumns: TableColumn[];
  currentItems: TableRow[];
  hiddenColumns: string[];
  currentPage: number;
  lastPage: number;
  setData: React.Dispatch<React.SetStateAction<TableData>>;
  setChanges: React.Dispatch<React.SetStateAction<TableData>>;
  setHiddenColumns: React.Dispatch<React.SetStateAction<string[]>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  handleHideColumn: (columnId: string) => void;
}

export const TableContext = createContext({} as TableContextProps);

export const TableProvider = ({ children }: { children: React.ReactNode }) => {
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

  const lastPage = useMemo(
    () => Math.ceil(rows?.length / itemsPerPage),
    [rows]
  );

  const handleHideColumn = useCallback(
    (columnId: string) =>
      setHiddenColumns(prev => toggleFilteredColumn(prev, columnId)),
    []
  );

  const visibleColumns = useMemo(
    () => columns?.filter(column => !hiddenColumns.includes(column.id)),
    [columns, hiddenColumns]
  );

  const providerValue = useMemo(
    () => ({
      columns,
      data,
      changes,
      hiddenColumns,
      currentItems,
      currentPage,
      visibleColumns,
      lastPage,
      setCurrentPage,
      setData,
      setChanges,
      setHiddenColumns,
      handleHideColumn,
    }),
    [
      columns,
      data,
      changes,
      hiddenColumns,
      currentItems,
      currentPage,
      visibleColumns,
      lastPage,
      setData,
      setChanges,
      setHiddenColumns,
      handleHideColumn,
      setCurrentPage,
    ]
  );

  return (
    <TableContext.Provider value={providerValue}>
      {children}
    </TableContext.Provider>
  );
};
