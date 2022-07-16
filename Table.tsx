import Select from "react-select";
import * as xlsx from "xlsx";
import DataGrid, { Column } from "react-data-grid";
import columns from "./columns.json";
import data from "./data.json";
import { useEffect, useMemo, useState } from "react";
import orderBy from "lodash.orderBy";

function getColumnName(name: string): string {
  const column = columns.find((column) => column.MDS_Name === name);
  return column!.MDS_Info_Name;
}

function getColumnDescription(name: string): string {
  const column = columns.find((column) => column.MDS_Name === name);
  return column!.MDS_Des;
}

const COLUMNS = [
  { key: "FUND_ID", name: getColumnName("FUND_ID"), minWidth: 40 },
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
  // { key: "TARGET_POPULATION", name: getColumnName("TARGET_POPULATION") },
  // Fees
  {
    key: "AVG_ANNUAL_MANAGEMENT_FEE",
    name: getColumnName("AVG_ANNUAL_MANAGEMENT_FEE"),
  },
  { key: "AVG_DEPOSIT_FEE", name: getColumnName("AVG_DEPOSIT_FEE") },
  // Yield
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
    key: "CONTROLLING_CORPORATION",
    name: getColumnName("CONTROLLING_CORPORATION"),
    width: 300,
  },
  {
    key: "MANAGING_CORPORATION",
    name: getColumnName("MANAGING_CORPORATION"),
    width: 300,
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
    key: "STANDARD_DEVIATION",
    name: getColumnName("STANDARD_DEVIATION"),
  },
  { key: "ALPHA", name: getColumnName("ALPHA"), width: 125 },
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
    width: 125,
  },
  {
    key: "MANAGING_CORPORATION_LEGAL_ID",
    name: getColumnName("MANAGING_CORPORATION_LEGAL_ID"),
    width: 100,
  },
  // { key: "CURRENT_DATE", name: getColumnName("CURRENT_DATE") },
].map(
  (column): Column<Row> => ({
    ...column,
    resizable: true,
    sortable: true,
    minWidth: column.name.length * 10,
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
    label: `${String(value).slice(4)}/${String(value).slice(0, 4)}`,
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

const SORT_OPTIONS = [
  { value: "FUND_ID", label: getColumnName("FUND_ID") },
  { value: "FUND_NAME", label: getColumnName("FUND_NAME") },
  { value: "MONTHLY_YIELD", label: getColumnName("MONTHLY_YIELD") },
  {
    value: "YEAR_TO_DATE_YIELD",
    label: getColumnName("YEAR_TO_DATE_YIELD"),
  },
  {
    value: "YIELD_TRAILING_3_YRS",
    label: getColumnName("YIELD_TRAILING_3_YRS"),
  },
  {
    value: "YIELD_TRAILING_5_YRS",
    label: getColumnName("YIELD_TRAILING_5_YRS"),
  },
  {
    value: "AVG_ANNUAL_YIELD_TRAILING_3YRS",
    label: getColumnName("AVG_ANNUAL_YIELD_TRAILING_3YRS"),
  },
  {
    value: "AVG_ANNUAL_YIELD_TRAILING_5YRS",
    label: getColumnName("AVG_ANNUAL_YIELD_TRAILING_5YRS"),
  },
];

const COLUMN_TO_DEFAULT_SORT_ORDER: Record<keyof Row, "asc" | "desc"> = {
  FUND_ID: "asc",
  FUND_NAME: "asc",
  MONTHLY_YIELD: "desc",
  YEAR_TO_DATE_YIELD: "desc",
  YIELD_TRAILING_3_YRS: "desc",
  YIELD_TRAILING_5_YRS: "desc",
  AVG_ANNUAL_YIELD_TRAILING_3YRS: "desc",
  AVG_ANNUAL_YIELD_TRAILING_5YRS: "desc",
};

const FILTERS = [
  // {
  //   column: "REPORT_PERIOD",
  //   options: REPORT_PERIOD_OPTIONS,
  // },
  {
    column: "FUND_CLASSIFICATION",
    options: FUND_CLASSIFICATION_OPTIONS,
  },
  { column: "SPECIALIZATION", options: SPECIALIZATION_OPTIONS },
  { column: "SUB_SPECIALIZATION", options: SUB_SPECIALIZATION_OPTIONS },
  { column: "TARGET_POPULATION", options: TARGET_POPULATION_OPTIONS },
];

function Table() {
  const [sortColumn, setSortColumn] = useState<keyof Row>("FUND_ID");
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
    return orderBy(
      tempRows,
      sortColumn,
      COLUMN_TO_DEFAULT_SORT_ORDER[sortColumn]
    );
  }, [filters, sortColumn]);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          padding: 8,
          paddingTop: 0,
          paddingBottom: 16,
        }}
      >
        <details>
          <summary>
            <strong>סינון: </strong>
            {FILTERS.filter((filter) => filters[filter.column])
              .map(
                (filter) =>
                  filter.options.find(
                    (option) => option.value === filters[filter.column]
                  )?.label
              )
              .join(", ")}
          </summary>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              paddingTop: 8,
              paddingRight: "1em",
            }}
          >
            <em>סננ.י את הטבלה לפי:</em>
            {FILTERS.map((filter) => (
              <div
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <strong>{getColumnName(filter.column)}: </strong>
                <Select
                  id={`${filter.column}-select`}
                  instanceId={`${filter.column}-select`}
                  options={filter.options}
                  onChange={(selected) =>
                    setFilters((filters) => ({
                      ...filters,
                      [filter.column]: selected?.value,
                    }))
                  }
                  isClearable={false}
                  value={filter.options.find(
                    (option) => option.value === filters[filter.column]
                  )}
                />
              </div>
            ))}
          </div>
        </details>
        <details>
          <summary>
            <strong>מיון: </strong>
            {SORT_OPTIONS.find((option) => option.value === sortColumn)?.label}
          </summary>
          <div
            style={{
              paddingRight: "1em",
              paddingTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 8,
            }}
          >
            <em>מיינ.י את הטבלה לפי:</em>
            <Select
              options={SORT_OPTIONS}
              value={SORT_OPTIONS.find((option) => option.value === sortColumn)}
              onChange={(selection) =>
                selection && setSortColumn(selection.value)
              }
              isClearable={false}
            />
          </div>
        </details>
        <details>
          <summary>
            <strong>מקרא</strong>
          </summary>
          <div style={{ paddingRight: "1em", paddingTop: 8 }}>
            {COLUMNS.map((column) => (
              <p key={column.key} style={{ margin: "0 0 8px" }}>
                <strong>{getColumnName(column.key)}: </strong>
                {getColumnDescription(column.key)}
              </p>
            ))}
          </div>
        </details>
        <details>
          <summary>
            <strong>ייצוא</strong>
          </summary>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              paddingRight: "1em",
              paddingTop: 8,
              gap: 8,
              alignItems: "flex-start",
            }}
          >
            <em>ייצא.י את הטבלה</em>
            <button
              onClick={() => exportToXlsx(rowsToData(rows), "kupot.xlsx")}
            >
              Excel
            </button>
            <button onClick={() => exportToCsv(rowsToData(rows), "kupot.csv")}>
              CSV
            </button>
          </div>
        </details>
      </div>
      <DataGrid
        columns={COLUMNS}
        rows={rows}
        direction="rtl"
        className="rdg-light"
        style={{ height: 500 }}
      />
      <p style={{ padding: "0 8px", margin: "8px 0" }}>
        תקופת דיווח:{" "}
        {
          REPORT_PERIOD_OPTIONS.find(
            (option) => option.value === filters.REPORT_PERIOD
          )?.label
        }
      </p>
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
