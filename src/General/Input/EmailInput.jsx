import React, { useState } from 'react'

const EmailInput = ({inputName, placeholderName, valueName, onChangeName,isDisabled}) => {
  return (
    <div className="col-sm-8">
    <input
      type="email"
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

export default EmailInput