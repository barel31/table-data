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

type CellValue = any;

interface PendingChange {
  column?: TableColumn;
  row?: TableRow;
  value?: CellValue;
  rowId?: string;
}
