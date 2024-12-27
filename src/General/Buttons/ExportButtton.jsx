import { Workbook } from 'exceljs';
import { saveAs } from "file-saver";
import React from 'react'
import { FaFileExport } from 'react-icons/fa'

const ExportButtton = ({columns, data, fileName}) => {
  const exportToExcel = async () => {
    // Create a new workbook
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(fileName);
  
    // Add headers dynamically
    const headers = columns.map((col) => ({
      header: col.label, // Use 'header' instead of 'label'
      key: col.dataKey,  // Use 'dataKey' to match your column keys
      width: 20,         // Set a default width or customize it
    }));
    worksheet.columns = headers;
  
    // Add data rows dynamically
    data.forEach((row) => {
      const rowData = {};
      columns.forEach((col) => {
        rowData[col.dataKey] = row[col.dataKey]; // Use 'dataKey' for accessing row data
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
}

export default ExportButtton