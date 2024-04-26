import { changeValueType } from '@/helpers/table';

/**
 * Changes the title of a column or updates the value of a cell in the table data.
 * @param event - The change event triggered by the input element.
 * @param prev - The previous table data.
 * @param isColumn - Optional parameter indicating whether the change is for a column title. Default is false.
 * @returns The updated table data.
 */
export const changeTitle = (
  event: React.ChangeEvent<HTMLInputElement>,
  prev: TableData,
  isColumn = false
) => {
  const { value, name, id } = event.target;

  if (name) {
    if (isColumn) {
      return {
        ...prev,
        columns: prev.columns.map((column) =>
          column.id === name ? { ...column, title: value } : column
        ),
      };
    } else {
      const column = prev.columns.find((col) => col.id === name);
      return {
        ...prev,
        data: prev.data.map((row) =>
          row.id === id
            ? {
                ...row,
                [name]: changeValueType(value, column?.type!),
              }
            : row
        ),
      };
    }
  } else return prev;
};

/**
 * Toggles the filtered state of a column in the table.
 * @param prev - The previous array of filtered column IDs.
 * @param columnId - The ID of the column to toggle.
 * @returns The updated array of filtered column IDs.
 */
export const toggleFilteredColumn = (prev: string[], columnId: string) => {
  if (prev.includes(columnId)) {
    const copy = [...prev];
    const index = copy.findIndex((item: any) => item === columnId);
    copy.splice(index, 1);
    return copy;
  } else return [...prev, columnId];
};
