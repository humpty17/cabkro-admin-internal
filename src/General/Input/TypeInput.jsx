import React from 'react'

const TypeInput = ({inputName, placeholderName, valueName, onChangeName, isDisabled = false}) => {
  return (
    <div className="col-sm-8">
    <input
      type="text"
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

export default TypeInput