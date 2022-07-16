import * as xlsx from "xlsx";

export function exportToCsv<R, SR>(data: string[][], fileName: string) {
  const content = data.map((cells) => cells.join(",")).join("\n");

  downloadFile(
    fileName,
    new Blob([content], { type: "text/csv;charset=utf-8;" })
  );
}

export function exportToXlsx<R, SR>(data: string[][], fileName: string) {
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.aoa_to_sheet(data);
  xlsx.utils.book_append_sheet(wb, ws, "Sheet 1");
  xlsx.writeFile(wb, fileName);
}

export function downloadFile(fileName: string, data: Blob) {
  const downloadLink = document.createElement("a");
  downloadLink.download = fileName;
  const url = URL.createObjectURL(data);
  downloadLink.href = url;
  downloadLink.click();
  URL.revokeObjectURL(url);
}

export function orderBy<
  SortKey extends string,
  Item extends Record<SortKey, unknown>
>(array: Item[], key: SortKey, dir: "asc" | "desc"): Item[] {
  return array
    .concat()
    .sort((a, b) =>
      a[key] > b[key]
        ? dir === "asc"
          ? 1
          : -1
        : b[key] > a[key]
        ? dir === "desc"
          ? -1
          : 1
        : 0
    );
}
