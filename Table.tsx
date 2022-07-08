import Select from "react-select";
import * as xlsx from "xlsx";
import DataGrid, { Column, DataGridProps } from "react-data-grid";
import columns from "./columns.json";
import data from "./data.json";
import { useMemo, useState } from "react";

function getColumnName(name: string): string {
  const column = columns.find((column) => column.MDS_Name === name);
  return column!.MDS_Info_Name;
}

const COLUMNS = [
  { key: "FUND_ID", name: getColumnName("FUND_ID") },
  {
    key: "FUND_NAME",
    name: getColumnName("FUND_NAME"),
    width: 400,
  },
  // { key: "REPORT_PERIOD", name: getColumnName("REPORT_PERIOD") },
  // {
  //   key: "FUND_CLASSIFICATION",
  //   name: getColumnName("FUND_CLASSIFICATION"),
  //   width: 200,
  //   filter: {
  //     type: "select",
  //   },
  // },
  { key: "SPECIALIZATION", name: getColumnName("SPECIALIZATION") },
  {
    key: "SUB_SPECIALIZATION",
    name: getColumnName("SUB_SPECIALIZATION"),
  },
  { key: "TARGET_POPULATION", name: getColumnName("TARGET_POPULATION") },
  {
    key: "CONTROLLING_CORPORATION",
    name: getColumnName("CONTROLLING_CORPORATION"),
  },
  {
    key: "MANAGING_CORPORATION",
    name: getColumnName("MANAGING_CORPORATION"),
  },
  // { key: "INCEPTION_DATE", name: getColumnName("INCEPTION_DATE") },

  { key: "DEPOSITS", name: getColumnName("DEPOSITS") },
  { key: "WITHDRAWLS", name: getColumnName("WITHDRAWLS") },
  {
    key: "INTERNAL_TRANSFERS",
    name: getColumnName("INTERNAL_TRANSFERS"),
  },
  {
    key: "NET_MONTHLY_DEPOSITS",
    name: getColumnName("NET_MONTHLY_DEPOSITS"),
  },
  { key: "TOTAL_ASSETS", name: getColumnName("TOTAL_ASSETS") },
  {
    key: "AVG_ANNUAL_MANAGEMENT_FEE",
    name: getColumnName("AVG_ANNUAL_MANAGEMENT_FEE"),
  },
  { key: "AVG_DEPOSIT_FEE", name: getColumnName("AVG_DEPOSIT_FEE") },
  { key: "MONTHLY_YIELD", name: getColumnName("MONTHLY_YIELD") },
  {
    key: "YEAR_TO_DATE_YIELD",
    name: getColumnName("YEAR_TO_DATE_YIELD"),
  },
  {
    key: "YIELD_TRAILING_3_YRS",
    name: getColumnName("YIELD_TRAILING_3_YRS"),
  },
  {
    key: "YIELD_TRAILING_5_YRS",
    name: getColumnName("YIELD_TRAILING_5_YRS"),
  },
  {
    key: "AVG_ANNUAL_YIELD_TRAILING_3YRS",
    name: getColumnName("AVG_ANNUAL_YIELD_TRAILING_3YRS"),
  },
  {
    key: "AVG_ANNUAL_YIELD_TRAILING_5YRS",
    name: getColumnName("AVG_ANNUAL_YIELD_TRAILING_5YRS"),
  },
  {
    key: "STANDARD_DEVIATION",
    name: getColumnName("STANDARD_DEVIATION"),
  },
  { key: "ALPHA", name: getColumnName("ALPHA") },
  { key: "SHARPE_RATIO", name: getColumnName("SHARPE_RATIO") },
  {
    key: "LIQUID_ASSETS_PERCENT",
    name: getColumnName("LIQUID_ASSETS_PERCENT"),
  },
  {
    key: "STOCK_MARKET_EXPOSURE",
    name: getColumnName("STOCK_MARKET_EXPOSURE"),
  },
  { key: "FOREIGN_EXPOSURE", name: getColumnName("FOREIGN_EXPOSURE") },
  {
    key: "FOREIGN_CURRENCY_EXPOSURE",
    name: getColumnName("FOREIGN_CURRENCY_EXPOSURE"),
  },
  {
    key: "MANAGING_CORPORATION_LEGAL_ID",
    name: getColumnName("MANAGING_CORPORATION_LEGAL_ID"),
  },
  // { key: "CURRENT_DATE", name: getColumnName("CURRENT_DATE") },
].map(
  (column): Column<Row> => ({
    ...column,
    resizable: true,
    sortable: true,
    minWidth: column.name.length * 10,
    headerRenderer: (props) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      // const [filterOpen, setFilterOpen] = useState(false);
      return (
        <div
          style={
            {
              // display: "flex",
              // flexDirection: "row",
              // alignItems: "center",
            }
          }
        >
          <span style={{ flexGrow: 1 }}>{props.column.name}</span>
        </div>
      );
    },
  })
);

type Row = typeof data[number];

const FUND_CLASSIFICATION_OPTIONS = [
  // { value: undefined, label: "כל הסוגים" },
  ...Array.from(
    new Set(data.map((row) => row.FUND_CLASSIFICATION)),
    (value) => ({ value, label: value })
  ),
];

const REPORT_PERIOD_OPTIONS = [
  // { value: undefined, label: "כל התקופות" },
  ...Array.from(new Set(data.map((row) => row.REPORT_PERIOD)), (value) => ({
    value,
    label: `${value.slice(4)}/${value.slice(0, 4)}`,
  })),
];

const SPECIALIZATION_OPTIONS = [
  { value: undefined, label: "כל ההתמחויות" },
  ...Array.from(new Set(data.map((row) => row.SPECIALIZATION)), (value) => ({
    value,
    label: value,
  })),
];

const SUB_SPECIALIZATION_OPTIONS = [
  { value: undefined, label: "כל ההתמחויות" },
  ...Array.from(
    new Set(data.map((row) => row.SUB_SPECIALIZATION)),
    (value) => ({
      value,
      label: value,
    })
  ),
];

const TARGET_POPULATION_OPTIONS = [
  // { value: undefined, label: "כל האוכלוסיות" },
  ...Array.from(new Set(data.map((row) => row.TARGET_POPULATION)), (value) => ({
    value,
    label: value,
  })),
];

function Table() {
  const [filters, setFilters] = useState<
    Partial<Record<keyof Row, string | undefined>>
  >({
    FUND_CLASSIFICATION: FUND_CLASSIFICATION_OPTIONS[0]?.value,
    REPORT_PERIOD: REPORT_PERIOD_OPTIONS.at(-1)?.value,
    TARGET_POPULATION: TARGET_POPULATION_OPTIONS[0]?.value,
  });

  const rows = useMemo(() => {
    let tempRows = data;
    for (const [key, value] of Object.entries(filters)) {
      if (value)
        tempRows = tempRows.filter((row) => row[key as keyof Row] === value);
    }
    return tempRows;
  }, [filters]);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flexShrink: 0 }}>
          תקופת הדיווח:{" "}
          <Select
            options={REPORT_PERIOD_OPTIONS}
            onChange={(selected) =>
              setFilters((filters) => ({
                ...filters,
                REPORT_PERIOD: selected?.value,
              }))
            }
            isClearable={false}
            value={REPORT_PERIOD_OPTIONS.find(
              (option) => option.value === filters.REPORT_PERIOD
            )}
          />
        </div>
        <div style={{ flexShrink: 0 }}>
          סוג קופה:{" "}
          <Select
            options={FUND_CLASSIFICATION_OPTIONS}
            onChange={(selected) =>
              setFilters((filters) => ({
                ...filters,
                FUND_CLASSIFICATION: selected?.value,
              }))
            }
            isClearable={false}
            value={FUND_CLASSIFICATION_OPTIONS.find(
              (option) => option.value === filters.FUND_CLASSIFICATION
            )}
          />
        </div>
        <div style={{ flexShrink: 0 }}>
          סוג התמחות ראשית:{" "}
          <Select
            options={SPECIALIZATION_OPTIONS}
            onChange={(selected) =>
              setFilters((filters) => ({
                ...filters,
                SPECIALIZATION: selected?.value,
              }))
            }
            isClearable={false}
            value={SPECIALIZATION_OPTIONS.find(
              (option) => option.value === filters.SPECIALIZATION
            )}
          />
        </div>
        <div style={{ flexShrink: 0 }}>
          סוג התמחות משנית:{" "}
          <Select
            options={SUB_SPECIALIZATION_OPTIONS}
            onChange={(selected) =>
              setFilters((filters) => ({
                ...filters,
                SUB_SPECIALIZATION: selected?.value,
              }))
            }
            isClearable={false}
            value={SUB_SPECIALIZATION_OPTIONS.find(
              (option) => option.value === filters.SUB_SPECIALIZATION
            )}
          />
        </div>
        <div style={{ flexShrink: 0 }}>
          אוכלוסיית יעד:{" "}
          <Select
            options={TARGET_POPULATION_OPTIONS}
            onChange={(selected) =>
              setFilters((filters) => ({
                ...filters,
                TARGET_POPULATION: selected?.value,
              }))
            }
            isClearable={false}
            value={TARGET_POPULATION_OPTIONS.find(
              (option) => option.value === filters.TARGET_POPULATION
            )}
          />
        </div>
        <button onClick={() => exportToXlsx(rowsToData(rows), "kupot.xlsx")}>
          יצא.י Excel
        </button>
        <button onClick={() => exportToCsv(rowsToData(rows), "kupot.csv")}>
          יצא.י CSV
        </button>
      </div>
      <DataGrid
        columns={COLUMNS}
        rows={rows}
        direction="rtl"
        className="rdg-light"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default Table;

function rowsToData(rows: Row[]): string[][] {
  return [
    COLUMNS.map((column) => column.name as string),
    ...rows.map((row) => COLUMNS.map((column) => row[column.key as keyof Row])),
  ];
}

function exportToCsv<R, SR>(data: string[][], fileName: string) {
  const content = data
    .map((cells) => cells.map(serialiseCellValue).join(","))
    .join("\n");

  downloadFile(
    fileName,
    new Blob([content], { type: "text/csv;charset=utf-8;" })
  );
}

function serialiseCellValue(value: unknown) {
  if (typeof value === "string") {
    const formattedValue = value.replace(/"/g, '""');
    return formattedValue.includes(",")
      ? `"${formattedValue}"`
      : formattedValue;
  }
  return value;
}

function exportToXlsx<R, SR>(data: string[][], fileName: string) {
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.aoa_to_sheet(data);
  xlsx.utils.book_append_sheet(wb, ws, "Sheet 1");
  xlsx.writeFile(wb, fileName);
}

function downloadFile(fileName: string, data: Blob) {
  const downloadLink = document.createElement("a");
  downloadLink.download = fileName;
  const url = URL.createObjectURL(data);
  downloadLink.href = url;
  downloadLink.click();
  URL.revokeObjectURL(url);
}
