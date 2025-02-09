import React from 'react'

const BackButton = ({handleBackClick}) => {
  return (
    <button className="btn btn-danger mb-0" onClick={handleBackClick}>Back</button>
  );
}

export default BackButton