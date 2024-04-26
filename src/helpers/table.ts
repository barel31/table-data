/**
 * Converts the value to the specified type.
 * @param value - The value to be converted.
 * @param type - The type to convert the value to.
 * @returns The converted value.
 */
export const changeValueType = (value: any, type: string) => {
  switch (type) {
    case 'number':
      return Number(value);
    case 'boolean':
      return value === 'true' || value === '1' ? true : false || false;
    default:
      return value;
  }
};

/**
 * Returns the input pattern for the specified type.
 * @param type - The type to get the input pattern for.
 * @returns The input pattern.
 */
export const inputPatern = (type: string) => {
  switch (type) {
    case 'number':
      return '[0-9]*';
    case 'boolean':
      return 'true|false|1|0';
    case 'email':
      return '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$';
    default:
      return '.*';
  }
};
