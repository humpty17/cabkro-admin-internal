import React from "react";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import { FiDownload } from "react-icons/fi";

const DownloadExcelButton = ({ columns }) => {
  // columns: An array of column headers from the table
  const handleDownload = async () => {
    debugger
    // Step 1: Create a workbook and a worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Table Data");

    // Step 2: Add table headers
    const headers = Object.keys(columns[1]); // Assumes the first row defines the structure
    worksheet.addRow(headers);

    // Add data rows
    // columns.forEach((row) => {
    //   const rowData = headers.map((header) => row[header]);
    //   worksheet.addRow(rowData);
    // });

    // Step 3: Adjust styles (optional)
    worksheet.getRow(1).font = { bold: true };
    worksheet.columns = columns.map(() => ({ width: 20 })); // Adjust width as needed

    // Step 4: Save the workbook to a blob
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    // Step 5: Trigger download
    saveAs(blob, "table-data.xlsx");
  }
  return (
    <button
      className="btn btn-secondary" onClick={handleDownload}
    >
      <FiDownload className="align-middle me-2" />
      Download sample
    </button>
  );

};

export default DownloadExcelButton;
