import React from 'react'
import Moment from "react-moment"


const UsuarioHeader = ({ tema, updatedAt, mail }) => {
  return (
    <header className="lecturas-header">
      {/* remember to change the image source to the dinamyc one and not to a background one */}
      <div className="lectura-header-content">
        <h1>{tema}</h1>
        <div className="lectura-header-content-data">
          <div className="lectura-header-content-data-date">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z" /></svg>
            <span>Miembro desde el <Moment locale="es" format="DD MMM YYYY" fromNow>{updatedAt}</Moment></span>
          </div>
          <div className="lectura-header-content-data-date">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z" /></svg>
            <span>Correo <a href={`mailto: ${mail}`}>{mail}</a></span>
          </div>
        </div>
      </div>

    </header>
  )
}

export default UsuarioHeader
