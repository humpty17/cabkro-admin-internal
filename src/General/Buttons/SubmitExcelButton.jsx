import React from 'react'

const SubmitExcelButton = ({handleSubmitClick}) => {
  return (
    <button className="btn btn-primary mx-1" onClick={handleSubmitClick}>Submit Excel Data</button>
  );
}

export default SubmitExcelButton