import { isDisabled } from '@testing-library/user-event/dist/utils'
import React from 'react'

const NumberInput = ({inputName, placeholderName, valueName, onChangeName, isDisabled}) => {
  return (
    <div className="col-sm-8">
    <input
    type="number"
    name={inputName}
    className="form-control"
    placeholder={placeholderName}
    value={valueName}
    onChange={onChangeName}
    disabled={isDisabled ? isDisabled : false}
  />
  </div>
  )
}

export default NumberInput