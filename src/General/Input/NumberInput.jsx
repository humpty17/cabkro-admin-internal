import React from 'react'

const NumberInput = ({inputName, placeholderName, valueName, onChangeName}) => {
  return (
    <input
    type="number"
    name={inputName}
    className="form-control"
    placeholder={placeholderName}
    value={valueName}
    onChange={onChangeName}
  />
  )
}

export default NumberInput