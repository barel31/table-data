/**
 * Converts the value to the specified type.
 * @param value - The value to be converted.
 * @param type - The type to convert the value to.
 * @returns The converted value. If the conversion fails, it returns `undefined`.
 */
export const convertValueType = (value: CellValue, type: string) => {
  switch (type) {
    case 'number':
      return Number(value);
    case 'boolean':
      if (value === 'true' || value === '1') return true;
      else if (value === 'false' || value === '0') return false;
      else return undefined;

    default:
      return value;
  }
};

/**
 * Returns the input pattern for the specified type.
 * @param type - The type to get the input pattern for.
 * @returns The input pattern.
 */
export const inputPattern = (type: string) => {
  switch (type) {
    case 'number':
      return '[0-9]*';
    case 'boolean':
      return 'true|false|1|0';
    default:
      return '.*';
  }
};
