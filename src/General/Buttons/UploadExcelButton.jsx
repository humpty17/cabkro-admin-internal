import React, { useState } from "react";
import ExcelJS from "exceljs";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import { NotificationManager } from "react-notifications";
import { callApi } from "../GeneralMethod";

const UploadExcelButton = () => {
  const [fileName, setFileName] = useState("No file chosen");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      NotificationManager.warning("No file selected!");
      return;
    }

    setFileName(file.name);

    try {
      // Initialize ExcelJS workbook
      const workbook = new ExcelJS.Workbook();
      const fileReader = new FileReader();

      fileReader.onload = async (e) => {
        const buffer = e.target.result;
        await workbook.xlsx.load(buffer);

        // Parse data from the first worksheet
        const worksheet = workbook.getWorksheet(1);
        const data = [];

        worksheet.eachRow((row, rowNumber) => {
          // Skip the header row (optional)
          if (rowNumber === 1) return;

          // Extract row data (excluding the empty first index)
          const rowData = row.values.slice(1);
          data.push(rowData);
        });

        console.log("Parsed Data:", data);

        // Upload data to the server
        const response = await callApi(
          "post",
          `Auth/RegisterAdminUser`,
          { ...data },
          {}
        );
        if (response && response.data) {
          // Check for response and response.data
          if (response.data.code === 200) {
            //console.log(response.data.data);
            NotificationManager.success(response.data.message);
            NotificationManager.success("Data uploaded successfully!");
          } else {
            console.error("API Error:", response.data.code, response.data);
            NotificationManager.error(response.data.message);
          }
        }
      }

      fileReader.readAsArrayBuffer(file)
    } catch (error) {
      console.error("Error processing file:", error);
      NotificationManager.error("Failed to process the file!");
    }
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
