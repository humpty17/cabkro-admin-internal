import React from 'react'

const DateInput = ({inputName, maxName, valueName, onChangeName}) => {
  return (
    <input 
    type="date" 
    max={maxName} 
    name={inputName} 
    className="form-control" 
    value={valueName} 
    onChange={onChangeName}/>
  )
}

export default DateInput