import React from 'react'
import Moment from "react-moment"

const LecturaTemplateHeader = ({ escritoPor, updatedAt, usuarioId }) => {

  return (
    <header className="lectura-header">
      {/* remember to change the image source to the dinamyc one and not to a background one */}
      {/* <img src={imgSrc} /> */}
      <div className="lectura-header-overlay"></div>
      <div className="lectura-header-content">

        <div className="lectura-header-content-data">
          <div className="lectura-header-content-data-author">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" /></svg>
            <span>Autor: <a href={`/usuario?id=${usuarioId}`}>{escritoPor}</a></span>
          </div>
          <div className="lectura-header-content-data-date">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 20h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v22h-24v-22h3v1c0 1.103.897 2 2 2s2-.897 2-2v-1h10v1c0 1.103.897 2 2 2s2-.897 2-2v-1h3zm-2 6h-20v14h20v-14zm-2-7c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-14 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2z" /></svg>
            <span>Publicado <Moment locale="es" fromNow>{updatedAt}</Moment></span>
          </div>
        </div>
      </div>
    </header>

  )
}

export default LecturaTemplateHeader
