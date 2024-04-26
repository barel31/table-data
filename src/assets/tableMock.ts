function generateLargeDataSet(rows: number): TableData {
  const data = [];
  for (let i = 0; i < rows; i++) {
    data.push({
      id: `raw${i}`,
      col1: `Name ${i}`,
      col2: Math.floor(Math.random() * 100),
      col3: `email${i}@example.com`,
      col4: Math.random() > 0.5,
      col5: `Yep ${i}`,
      col6: `No ${i}`,
      address: `Address ${i}`,
    });
  }

  return {
    columns: [
      { id: 'col1', ordinalNo: 1, title: 'Name', type: 'string' },
      { id: 'col2', ordinalNo: 2, title: 'Age', type: 'number', width: 100 },
      { id: 'col3', ordinalNo: 3, title: 'Email', type: 'string' },
      { id: 'col4', ordinalNo: 4, title: 'Adult', type: 'boolean' },
      { id: 'col5', ordinalNo: 5, title: 'Yep', type: 'string', width: 50 },
      { id: 'col6', ordinalNo: 6, title: 'No', type: 'string', width: 50 },
      { id: 'address', ordinalNo: 7, title: 'Address', type: 'string' },
    ],
    data,
  };
}

export const largeMockData = generateLargeDataSet(1000);

export const mockData: TableData = {
  columns: [
    { id: 'col1', ordinalNo: 1, title: 'Name', type: 'string' },
    { id: 'col2', ordinalNo: 2, title: 'Age', type: 'number', width: 100 },
    { id: 'col3', ordinalNo: 3, title: 'Email', type: 'string' },
    { id: 'col4', ordinalNo: 4, title: 'Adult', type: 'boolean' },
  ],
  data: [
    {
      id: 'raw1',
      col1: 'John Doe',
      col2: 30,
      col3: 'john.doe@example.com',
      col4: true,
    },
    {
      id: 'raw2',
      col1: 'Jane Doe',
      col2: 25,
      col3: 'jane.doe@example.com',
      col4: false,
    },
    {
      id: 'raw3',
      col1: 'Bob Smith',
      col2: 35,
      col3: 'bob.smith@example.com',
      col4: true,
    },
  ],
};
