import React from 'react'

const EmailInput = ({inputName, placeholderName, valueName, onChangeName}) => {
  return (
    <input
      type="email"
      name={inputName}
      className="form-control"
      placeholder={placeholderName}
      value={valueName}
      onChange={onChangeName}
    />
  );
}

export default EmailInput