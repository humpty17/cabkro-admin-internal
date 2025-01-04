import React from 'react'

const DateInput = ({inputName, maxName, valueName, onChangeName}) => {
  return (
    <div className="col-sm-8">
    <input 
    type="date" 
    max={maxName} 
    name={inputName} 
    className="form-control" 
    value={valueName} 
    onChange={onChangeName}/>
    </div>
  )
}

export default DateInput