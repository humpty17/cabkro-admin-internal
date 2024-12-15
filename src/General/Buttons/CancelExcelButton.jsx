import React from 'react'

const CancelExcelButton = ({handleCancelClick}) => {
  return (
    <button className="btn btn-success" onClick={handleCancelClick}>Cancel Data</button>
  );
}

export default CancelExcelButton