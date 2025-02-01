import React from 'react'

const BackButton = ({handleBackClick}) => {
  return (
    <button className="btn btn-danger" onClick={handleBackClick}>Back</button>
  );
}

export default BackButton