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
