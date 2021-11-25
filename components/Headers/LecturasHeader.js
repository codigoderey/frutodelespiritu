import React from 'react'

const LecturasHeader = ({ tema }) => {
  return (
    <header className="lecturas-header">
      {/* remember to change the image source to the dinamyc one and not to a background one */}
      <h1>{tema}</h1>

    </header>
  )
}

export default LecturasHeader
