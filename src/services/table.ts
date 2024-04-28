import { convertValueType } from '@/helpers/table';

/**
 * Updates the value of a cell in the table data.
 * @param prev - The previous table data.
 * @param column - The column of the cell being updated.
 * @param row - The row of the cell being updated.
 * @param value - The new value for the cell.
 * @returns The updated table data.
 */
export const updateCellValue = (
  prev: TableData,
  column: TableColumn,
  row: TableRow,
  value: CellValue
): TableData => {
  if (!row) {
    if (value === column.title) return prev;
    const col = prev.columns.find(col => col.id === column.id);
    if (col) {
      col.title = String(value);
      return { ...prev };
    }
    return {
      ...prev,
      columns: [...prev.columns, { ...column, title: value!.toString() }],
    };
  }

  if (value === row[column.id]) return prev;
  const changedValueType = convertValueType(value, column.type);
  if (!changedValueType) return prev;
  const findRow = prev.data.find(r => r.id === row.id);
  if (findRow) {
    findRow[column.id] = changedValueType;
    return { ...prev };
  }
  return {
    ...prev,
    data: [...prev.data, { [column.id]: changedValueType, ...row }],
  };
};

/**
 * Toggles the visibility of a column in the table.
 * @param prev - The previous list of visible columns.
 * @param columnId - The ID of the column to toggle.
 * @returns The updated list of visible columns.
 */
export const toggleFilteredColumn = (prev: string[], columnId: string) => {
  if (prev.includes(columnId)) {
    return prev.filter(column => column !== columnId);
  } else return [...prev, columnId];
};

/**
 * Adds a new row to the table data.
 * @param prev - The previous table data.
 * @param newRow - The new row to add
 * @returns The updated table data.
 */
export const addNewRow = (
  prev: TableData,
  e: React.FormEvent<HTMLFormElement>
) => {
  const form = e.target as HTMLFormElement;
  const newRow = Object.fromEntries(new FormData(form).entries()) as TableRow;
  newRow.id = `row${prev.data.length + 1}`;
  const newData = [newRow, ...prev.data];
  return { ...prev, data: newData };
};

/**
 * Deletes a row from the table data.
 * @param prev - The previous table data.
 * @param rowId - The ID of the row to delete.
 * @returns The updated table data.
 */
export const deleteRow = (prev: TableData, rowId: string) => {
  const newData = prev.data.filter(row => row.id !== rowId);
  return { ...prev, data: newData };
};

/**
 * Clears all rows from the table data.
 * @param prev - The previous table data.
 * @returns The updated table data.
 */
export const clearRows = (prev: TableData) => ({ ...prev, data: [] });

/**
 * Updates the changes in the table data.
 * @param prev - The previous table data.
 * @param changes - The changes to be applied to the table data.
 * @returns The updated table data.
 */
export const updateChanges = (
  prev: TableData,
  changes: TableData
): TableData => {
  return {
    ...prev,
    columns: prev.columns.map(column => {
      const changeColumn = changes.columns.find(c => c.id === column.id);
      return changeColumn ? changeColumn : column;
    }),
    data: prev.data.map(row => {
      const changeRow = changes.data.find(d => d.id === row.id);
      return changeRow ? changeRow : row;
    }),
  };
};
