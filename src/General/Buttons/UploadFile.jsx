import React from 'react'

const UploadFile = ({buttonName}) => {
  return (
    <button type="submit" className="btn btn-primary">
      {buttonName}
    </button>
  );
}

export default UploadFile