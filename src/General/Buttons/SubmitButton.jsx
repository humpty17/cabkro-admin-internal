import React from 'react'

const SubmitButton = ({handleClick, buttonName}) => {
  return (
    <button type="submit" className="btn btn-primary mx-2" onClick={handleClick}>
      {buttonName}
    </button>
  );
}

export default SubmitButton