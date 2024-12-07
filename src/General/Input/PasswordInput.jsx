import React from 'react'

const PasswordInput = ({type, inputName, placeholderName, valueName, onChangeName}) => {
  return (
    <input
      type={type}
      name={inputName}
      className="form-control"
      placeholder={placeholderName}
      value={valueName}
      onChange={onChangeName}
    />
  );
}

export default PasswordInput