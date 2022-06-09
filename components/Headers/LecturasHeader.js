import React from 'react'

const LecturasHeader = ({ tema, imgSrc }) => {
  return (
    <header className="lecturas-header">
      {imgSrc &&
        <img src={imgSrc} />
      }
      <div className="lecturas-header-overlay">
        <h1>{tema}</h1>
      </div>
    </header>
  )
}

export default LecturasHeader
