import React from 'react'

const FormLabel = ({label}) => {
  return (
    <label className="col-form-label col-sm-3 text-sm-end p-2 required">{label}</label>
  )
}

export default FormLabel