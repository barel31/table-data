interface TableData {
  columns: Array<TableColumn>;
  data: Array<TableRow>;
}

interface TableColumn {
  id: string;
  ordinalNo: number;
  title: string;
  type: string;
  width?: number;
}

interface TableRow {
  id: string;
  [columnId: string]: any;
}
