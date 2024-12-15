import React, { useState } from "react";
import ExcelJS, { Workbook } from "exceljs";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import { NotificationManager } from "react-notifications";
import { callApi } from "../GeneralMethod";

const UploadExcelButton = () => {
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = async (event) => {
    debugger;
    const file = event.target.files[0];
    if (!file) {
      NotificationManager.warning("No file selected!");
      return;
    }
  
    setFileName(file.name);
  
    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      try {
        const buffer = e.target.result;
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);
  
        // Parse data from the first worksheet
        const worksheet = workbook.getWorksheet(1);
        const data = [];
  
        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber === 1) return; // Skip header row
          const rowData = row.values.slice(1);
          data.push(rowData);
        });
  
        console.log("Parsed Data:", data);
  
        // Upload data to the server
        const response = await callApi("post", `Auth/RegisterAdminUser`, { data }, {});
        if (response && response.data) {
          if (response.data.code === 200) {
            NotificationManager.success(response.data.message);
            NotificationManager.success("Data uploaded successfully!");
          } else {
            console.error("API Error:", response.data.code, response.data);
            NotificationManager.error(response.data.message);
          }
        }
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
      <label htmlFor="actual-btn" className="btn btn-primary" >
        <FiPlus className="align-middle me-2" />
        Upload Package List
      </label>
    </>
  );
};

export default UploadExcelButton;
