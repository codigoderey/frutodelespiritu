import React, { useState, useEffect } from 'react'
import Column30 from '../../components/Layout/Column30'
import Column70 from '../../components/Layout/Column70'
import LecturaTemplateHeader from '../../components/Headers/LecturaTemplateHeader'
import Recientes from '../../components/Layout/Recientes'
import baseURL from '../../utils/baseURL'
import axios from "axios"
import Head from "next/head"
import Link from "next/link"

const lectura = ({ lectura, usuario }) => {

  const { updatedAt, publicadoPor, contenido } = lectura

  const [bookmark, setBookmark] = useState(false)

  useEffect(() => {

    if (!usuario) {
      return
    } else {
      const siEsGuardada = usuario.lecturasGuardadas.find(l => l.lectura._id === lectura._id)
      if (siEsGuardada) {
        setBookmark(true)
      }
    }

  }, [])

  const handleAddLectura = async () => {
    try {
      const url = `${baseURL}/api/usuarios`
      const payload = {
        usuarioId: usuario._id,
        lecturaId: lectura._id,
        action: "anadirlibro"
      }
      await axios.post(url, payload)
      setBookmark(bookmark => !bookmark)

    } catch (error) {
      console.error(error)
    }
  }

  const handleRemoveLectura = async () => {
    try {
      const url = `${baseURL}/api/usuarios`;
      const payload = {
        usuarioId: usuario._id,
        lecturaId: lectura._id,
        action: "removerlibro"
      };

      await axios.put(url, payload);
      setBookmark((bookmark) => !bookmark);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>{lectura.titulo} | Fruto del Espíritu</title>
        <meta name="description" content={lectura.resumen} />
        <meta name="keywords" content="estudios biblicos, estudia la biblia, entiende la biblia, espiritu santo" />
        <meta property="og:title" content={`${lectura.titulo} | Fruto del Espíritu`} />
        <meta property="og:description" content={lectura.resumen} />
        <meta property="og:locale" content="es_US" />
        <meta property="og:image" content="https://frutodelespiritu.com/logo.png" />
        <meta property="og:url" content={`${baseURL}/lecturas/lectura?slug=${lectura.slug}`} />
      </Head>
      <LecturaTemplateHeader updatedAt={updatedAt} escritoPor={publicadoPor.nombre} usuarioId={publicadoPor._id} />
      <div className="container-full p2">
        <Column70>
          <h1 className="lectura-title">{lectura.titulo}</h1>
          <div dangerouslySetInnerHTML={{ __html: contenido }} className="lectura-single-container p3">
          </div>
          {usuario && !bookmark ? (
            <div className="guardar-lectura p3 bg-light">
              <svg onClick={handleAddLectura} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M16 10.975v13.025l-6-5.269-6 5.269v-24h6.816c-1.123 1.168-1.816 2.752-1.816 4.5 0 3.736 3.162 6.768 7 6.475zm4-6.475c0 2.485-2.018 4.5-4.5 4.5-2.484 0-4.5-2.015-4.5-4.5s2.016-4.5 4.5-4.5c2.482 0 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z" /></svg>
              <p className="mb0">Guardar lectura</p>
            </div>) : usuario && (
              <div className="guardar-lectura p3 bg-light">
                <svg onClick={handleRemoveLectura} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M16 10.975v13.025l-6-5.269-6 5.269v-24h6.816c-1.123 1.168-1.816 2.752-1.816 4.5 0 3.736 3.162 6.768 7 6.475zm-.5-10.975c-2.486 0-4.5 2.015-4.5 4.5s2.014 4.5 4.5 4.5c2.484 0 4.5-2.015 4.5-4.5s-2.016-4.5-4.5-4.5zm-.469 6.484l-1.688-1.637.695-.697.992.94 2.115-2.169.697.696-2.811 2.867z" /></svg>
                <p className="mb0">Lectura guardada</p>
              </div>)
          }
          {!usuario && (
            <div className="guardar-lectura p3 bg-light">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M8 12v-4l8 7-8 7v-4h-8v-6h8zm2-5.024v-2.976h6v8.051l8 6.767v-16.818h-16v3.284l2 1.692z" /></svg>
              <p className="mb0 ml3"><Link href="/ingresar"><a>Inicia sesión para que guardes esta lectura</a></Link></p>
            </div>
          )}
          <div>
            <div id="disqus_thread"></div>
          </div>

        </Column70>
        <Column30>
          <Recientes />
        </Column30>
      </div>

    </>
  )
}

lectura.getInitialProps = async ({ query: { slug } }) => {
  const url = `${baseURL}/api/lecturas`
  const payload = { params: { slug } }
  const { data } = await axios.get(url, payload)
  return { lectura: data }
}

export default lectura
