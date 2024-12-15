import React from 'react'

const SubmitExcelButton = ({handleSubmitClick}) => {
  return (
    <button className="btn btn-success" onClick={handleSubmitClick}>Submit Data</button>
  );
}

export default SubmitExcelButton