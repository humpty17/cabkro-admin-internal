import React from 'react'

const CancelExcelButton = ({handleCancelClick}) => {
  return (
    <button className="btn btn-danger" onClick={handleCancelClick}>Cancel Data</button>
  );
}

export default CancelExcelButton