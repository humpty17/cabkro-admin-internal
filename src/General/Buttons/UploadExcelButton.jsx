import React, { useState } from "react";
import ExcelJS, { Workbook } from "exceljs";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import { NotificationManager } from "react-notifications";

const UploadExcelButton = ({setPreviewData, otherData, buttonName}) => {
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = async (event) => {
    //debugger;
    const file = event.target.files[0];
    if (!file) {
      NotificationManager.warning("No file selected!");
      return;
    }
  
    setFileName(file.name);
  
    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      //debugger
      try {
        const buffer = e.target.result;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);
  
        // Parse data from the first worksheet
        const worksheet = workbook.getWorksheet(1);
        const data = [];
  
        // worksheet.eachRow((row, rowNumber) => {
        //   debugger
        //   if (rowNumber === 1) return; // Skip header row
        //   console.log(row)
        //   const rowData = row;
        //   data.push(rowData);
        // });
  
        const headers = [];
        worksheet.getRow(1).eachCell((cell, colNumber) => {
          headers.push(cell.text);
        });
        
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber > 1) {  // Skip the header row
            const rowData = {};
            row.eachCell((cell, colNumber) => {
              rowData[headers[colNumber - 1]] = cell.text;
            });
            const rowUpdatedData = {...rowData, ...otherData}
            data.push(rowUpdatedData);
          }
        });
        console.log("Data:", data);
        
        setPreviewData(data)
        console.log("Parsed Data:", data);
      } catch (err) {
        console.error("Error in file processing:", err);
        NotificationManager.error("An error occurred while processing the file.");
      }
    };
  
    fileReader.readAsArrayBuffer(file);
  };
  return (
    <>
      <input type="file" accept=".xlsx, .xls" id="actual-btn" onChange={handleFileChange} hidden/>
      <label htmlFor="actual-btn" className="btn btn-primary mx-1" >
        <FiPlus className="align-middle me-2" />
        {buttonName}
      </label>
    </>
  );
};

export default UploadExcelButton;
