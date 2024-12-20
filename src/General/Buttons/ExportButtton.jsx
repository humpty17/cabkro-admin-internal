import React from 'react'
import { FaFileExport } from 'react-icons/fa'

const ExportButtton = () => {
  return (
    <button className="btn btn-success ">
      <FaFileExport className="align-middle me-2" />
      Export Data
    </button>
  );
}

export default ExportButtton