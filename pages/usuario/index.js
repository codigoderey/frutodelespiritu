import React, { useState, useEffect } from 'react'
import Link from "next/link"
import PerfilHeader from "../../components/Layout/UsuarioHeader"
import baseURL from '../../utils/baseURL'
import axios from 'axios'
import Head from "next/head"

const perfil = ({ perfil }) => {
  const [lecturas, setLecturas] = useState([])

  const lecturasPublicadas = lecturas.filter(l => l.publicadoPor.nombre === perfil.nombre)

  useEffect(() => {
    obtenerLecturas()
  }, [])

  const obtenerLecturas = async () => {
    const url = `${baseURL}/api/lecturas`
    const { data } = await axios.get(url)
    setLecturas(data)
  }

  return (
    <>
      <Head>
        <title>Perfil de {perfil.nombre} | Fruto del Espíritu</title>
        <meta name="description" content={`Perfil de ${perfil.nombre} en Fruto del Espíritu, lecturas que edifican al pueblo cristiano.`} />
        <meta name="keywords" content="estudios biblicos, estudia la biblia, entiende la biblia, espiritu santo" />
        <meta property="og:title" content={`Perfil de ${perfil.nombre} | Fruto del Espíritu`} />
        <meta property="og:description" content={`Perfil de ${perfil.nombre} en Fruto del Espíritu, lecturas que edifican al pueblo cristiano.`} />
        <meta property="og:locale" content="es_US" />
        <meta property="og:image" content="https://frutodelespiritu.com/logo.png" />
        <meta property="og:url" content={`${baseURL}/usuario?id=${perfil._id}`} />

      </Head>
      <PerfilHeader tema={perfil.nombre} updatedAt={perfil.createdAt} mail={perfil.correo} />
      <section className="container-fluid">
        <div className="container-mid">
          <div className="perfil-acciones-wrapper">
            <div className="perfil-acciones">
              <h2>Lecturas guardadas por {perfil.nombre}</h2>
            </div>
            {perfil.lecturasGuardadas.length ? perfil.lecturasGuardadas.map(l => (
              <div key={l._id} className="perfil-acciones-edit-container">
                <Link href={`${baseURL}/lecturas/lectura?slug=${l.lectura.slug}`}><a>{l.lectura.titulo}</a></Link>
              </div>
            )) :
              <div className="perfil-acciones-edit-container"><p>Este usuario no tiene lecturas guardadas</p></div>}


            <div className="perfil-acciones">
              <h2>Lecturas publicadas por {perfil.nombre}</h2>
            </div>

            {lecturasPublicadas.length ? lecturasPublicadas.map(l =>
            (<div key={l._id} className="perfil-acciones-edit-container">
              <Link href={`${baseURL}/lecturas/lectura?slug=${l.slug}`}><a>{l.titulo}</a></Link>
            </div>
            )) : (
              <div className="perfil-acciones-edit-container"><p>Este usuario no tiene lecturas guardadas</p></div>
            )
            }

          </div>
        </div>
      </section>
    </>
  )
}

perfil.getInitialProps = async ({ query: { id } }) => {

  const url = `${baseURL}/api/usuarios`
  const payload = { params: { id } }
  const { data } = await axios.get(url, payload)
  return { perfil: data }
}

export default perfil
