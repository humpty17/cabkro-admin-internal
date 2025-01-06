import React from 'react'

const SubmitButton = ({handleClick, buttonName, isDisabled = false}) => {
  return (
    <button type="submit" className="btn btn-primary mx-2 my-1" onClick={handleClick} disabled={isDisabled}>
      {buttonName}
    </button>
  );
}

export default SubmitButton