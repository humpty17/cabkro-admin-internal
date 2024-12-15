import React from 'react'

const ResetButton = ({onHandleClick}) => {
  return (
    <button type="button" className="btn btn-secondary mx-2" onClick={onHandleClick}>
      Reset
    </button>
  );
}

export default ResetButton