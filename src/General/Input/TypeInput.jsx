import React from 'react'

const TypeInput = ({inputName, placeholderName, valueName, onChangeName}) => {
  return (
    <input
      type="text"
      name={inputName}
      className="form-control"
      placeholder={placeholderName}
      value={valueName}
      onChange={onChangeName}
    />
  );
}

export default TypeInput