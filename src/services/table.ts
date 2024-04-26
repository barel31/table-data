import { changeValueType } from '@/helpers/table';

/**
 * Changes the title of a column or updates the value of a cell in the table data.
 * @param event - The change event triggered by the input element.
 * @param prev - The previous table data.
 * @param isColumn - Optional parameter indicating whether the change is for a column title. Default is false.
 * @returns The updated table data.
 */
export const changeValue = (
  event: React.ChangeEvent<HTMLInputElement>,
  prev: TableData,
  isColumn = false
) => {
  const { value, name, id } = event.target;

  const column = prev.columns.find((col) => col.id === name);
  if (!column) return prev;

  if (isColumn) {
    column.title = value;
    return prev;
  } else {
    const row = prev.data.find((row) => row.id === id);
    if (!row) return prev;
    row[name] = changeValueType(value, column.type);
    return prev;
  }
};

/**
 * Toggles the filtered state of a column in the table.
 * @param prev - The previous array of filtered column IDs.
 * @param columnId - The ID of the column to toggle.
 * @returns The updated array of filtered column IDs.
 */
export const toggleFilteredColumn = (prev: string[], columnId: string) => {
  if (prev.includes(columnId)) {
    return prev.filter((column) => column !== columnId);
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
  newRow.id = `raw${prev.data.length + 1}`;
  const newData = [...prev.data, newRow];
  return { ...prev, data: newData };
};
