/**
 * Converts the value to the specified type.
 * @param value - The value to be converted.
 * @param type - The type to convert the value to.
 * @returns The converted value.
 */
export const changeCellValueType = (value: any, type: string) => {
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

export const cloneDeep = (obj: Object) => {
  // clone the object to prevent mutation
  // clone deep to prevent mutation
  return JSON.parse(JSON.stringify(obj));
};
