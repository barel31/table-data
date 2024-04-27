import { changeCellValueType } from '@/helpers/table';

/**
 * Updates the value of a cell in the table data.
 * @param prev - The previous table data.
 * @param column - The column of the cell to update.
 * @param row - The row of the cell to update.
 * @param value - The new value of the cell.
 * @returns The updated table data.
 */
export const updateCellValue = (
  prev: TableData,
  column: TableColumn,
  row: TableRow,
  value: CellValue
) => {
  if (!row) {
    if (value === column.title) return prev;
    return {
      ...prev,
      columns: prev.columns.map(col => {
        if (col.id === column.id) {
          col.title = String(value);
          return col;
        }
        return col;
      }),
    };
  }

  if (value === row[column.id]) return prev;
  return {
    ...prev,
    data: prev.data.map(r => {
      if (r.id === row.id) {
        r[column.id] = changeCellValueType(value, column.type) ?? r[column.id];
      }
      return r;
    }),
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
