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
