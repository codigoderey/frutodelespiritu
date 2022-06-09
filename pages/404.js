import React from 'react'
import Link from "next/link"

const NotFoundPage = () => {
  return (
    <div className='empty-tomb'>
      <div className="h-100 container-full flex flex-column align-items-center justify-content-center p3">
        <h1 className='mb3'>La página que buscas no existe, pero...</h1>
        <p className='container'>Algunos sucesos inesperados no son como este, por ejemplo, a Jesús no lo encontraron en la tumba porque había resucitado <strong><span className='empty-tomb_verse p1'>Marcos 16:1-8</span></strong>. Para continuar aprendiendo sobre Su vida, puedes oprimir el siguiente enlace.</p>
        <Link href="/lecturas"><a className="btn-primary">Continuar aprendiendo</a></Link>
      </div>
    </div>
  )
}

export default NotFoundPage
