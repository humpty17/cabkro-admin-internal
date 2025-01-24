import { Workbook } from "exceljs";
import { saveAs } from "file-saver";
import React from "react";
import { FaFileExport } from "react-icons/fa";
import { ACTION, SRNOKEY } from "../ConstStates";

const ExportButtton = ({ columns, data, fileName }) => {
  const exportToExcel = async () => {
    // Create a new workbook
    debugger;
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(fileName);

    // Filter out the "Action" column (use 'dataKey' or 'label')
    const filteredColumns = columns.filter((col) => col.dataKey !== ACTION);

    // Add headers dynamically
    const headers = filteredColumns.map((col) => ({
      header: col.label, // Use 'label' for header text
      key: col.dataKey, // Use 'dataKey' to match your column keys
      width: 20, // Set a default width or customize it
    }));
    worksheet.columns = headers;

    // Add data rows dynamically with SRNO
    data.forEach((row, index) => {
      const rowData = {};
      filteredColumns.forEach((col) => {
        if (col.dataKey === SRNOKEY) {
          // Add the serial number based on the index
          rowData[col.dataKey] = index + 1;
        } else {
          // Map the rest of the row data
          rowData[col.dataKey] = row[col.dataKey];
        }
      });
      worksheet.addRow(rowData);
    });

    

    // Style headers
    headers.forEach((_, colIndex) => {
      const cell = worksheet.getCell(1, colIndex + 1);
      cell.font = { bold: true };
      cell.alignment = { horizontal: "center" };
    });

    // Generate Excel file
    const buffer = await workbook.xlsx.writeBuffer();

    // Save the file using FileSaver
    saveAs(new Blob([buffer]), `${fileName}.xlsx`);
  };

  return (
    <button className="btn btn-success " onClick={exportToExcel}>
      <FaFileExport className="align-middle me-2" />
      Export Data
    </button>
  );
};

export default ExportButtton;
