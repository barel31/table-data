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

// add scoller to top when adding new row, also add the row to the top
// Move AddRow to top
// change filteredColumns to hiddenColumns
// hiddenColumns to useMemo

// Reuse input
// Change onChange to Save button

type CellValue = string | number | boolean | undefined;
