import React from 'react'

const PasswordInput = ({type, inputName, placeholderName, valueName, onChangeName,isDisabled}) => {
  return (
    <div className="col-sm-8">
    <input
      type={type}
      name={inputName}
      className="form-control"
      placeholder={placeholderName}
      value={valueName}
      onChange={onChangeName}
      disabled={isDisabled}
    />
    </div>
  );
}

export default PasswordInput