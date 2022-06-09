import React from 'react'
import Link from "next/link"
import Moment from "react-moment"

const LecturaItem = ({ usuario, resultadoLecturas }) => {
  return (
    <>
      {
        resultadoLecturas.length === 0
          ? (<div className="lectura-list-container"><p className="p2">No hay lecturas por el momento</p></div>)
          : resultadoLecturas.map(l => (
            <div key={l._id} className="lectura-list-container">
              <div className="lectura-list-body p3">
                <a href={`/lecturas/lectura?slug=${l.slug}`}><h1>{l.titulo}</h1></a>
                <div className="data">
                  <span className="mr2">Categoría: {l.categoria}</span>
                  <span className="divisor ml2 mr2">|</span>
                  <span>Escrito por <Link href={`${usuario && usuario.nombre === l.publicadoPor.nombre ? "/perfil" : `/usuario?id=${l.publicadoPor._id}`}`}>{l.publicadoPor.nombre}</Link></span>
                  <span className="divisor ml2 mr2">|</span>
                  <span>Publicado <Moment locale="es" fromNow>{l.createdAt}</Moment></span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: l.resumen }} />
              </div>
            </div>
          )).reverse()
      }
    </>
  )
}

export default LecturaItem
