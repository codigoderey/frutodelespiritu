import React, { useState, useEffect } from 'react'
import Link from "next/link"
import PerfilHeader from "../components/Layout/PerfilHeader"
import { handleLogout } from '../utils/auth'
import baseURL from '../utils/baseURL'
import axios from 'axios'
import { useRouter } from "next/router"
import cookie from 'js-cookie'
import Head from "next/head"

const perfil = ({ usuario, lecturas }) => {
  const router = useRouter()

  // lecturas state handling
  const [lecturaId, setLecturaId] = useState(null)
  const [showModalEliminarLectura, setShowModalEliminarLectura] = useState(false)
  const [showModalEliminarCuenta, setShowModalEliminarCuenta] = useState(false)

  // categorias state handling
  const [showModalCrearCategoria, setShowModalCrearCategoria] = useState(false)
  const [showModalEliminarCategoria, setShowModalEliminarCategoria] = useState(false)
  const [showModalEditarCategoria, setShowModalEditarCategoria] = useState(false)
  const [nuevaCategoria, setNuevaCategoria] = useState("")
  const [categorias, setCategorias] = useState([])
  const [categoriaId, setCategoriaId] = useState(null)
  const [categoriaParaEditar, setCategoriaParaEditar] = useState("")

  // request processing handling
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  // user state handling
  const publicadasPorUsuario = lecturas.filter(l => l.publicadoPor.nombre === usuario.nombre)
  const isAdminOrJefe = usuario.permisos === "admin" || usuario.permisos === "root"


  const obtenerLecturaId = (id) => {
    setShowModalEliminarLectura(true)
    setLecturaId(id)
  }

  const obtenerCategoriaId = (id) => {
    setShowModalEliminarCategoria(true)
    setCategoriaId(id)
  }

  const obtenerCategoriaEditarId = (id) => {
    setShowModalEditarCategoria(true)
    const categoriaFiltrada = categorias.filter(c => c._id === id)
    setCategoriaId(id)
    setCategoriaParaEditar(categoriaFiltrada[0].nombre)
  }

  const removerLectura = async (id) => {
    try {
      const url = `${baseURL}/api/lecturas`
      await axios.delete(url, { data: { id } })
      setShowModalEliminarLectura(false)
      router.push("/perfil")
    } catch (error) {
      console.error(error)
    }
  }

  const eliminarUsuario = async (id) => {
    try {
      const url = `${baseURL}/api/usuarios`
      await axios.delete(url, { data: { id } })
      setShowModalEliminarCuenta(false)
      cookie.remove("token")
      router.push("/")
    } catch (error) {
      console.error(error)
    }
  }

  const eliminarCategoria = async (id) => {
    try {
      setLoading(true)
      const url = `${baseURL}/api/categorias`
      await axios.delete(url, { data: { id } })
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      console.error(error)
    }
  }

  const handleActualizarCategoria = async (id) => {
    try {
      console.log(id, categoriaParaEditar)
      setLoading(true)
      const url = `${baseURL}/api/categorias`
      await axios.put(url, { id, categoriaParaEditar })
      // setTimeout(() => {
      //   window.location.reload()
      // }, 1500)
    } catch (error) {
      console.error(error)
    }
  }

  const handleNuevaCategoriaChange = (e) => {
    setNuevaCategoria(e.target.value)
  }

  const handleEditarCategoriaChange = (e) => {
    setCategoriaParaEditar(e.target.value)
  }

  const handleSubmitNuevaCategoria = async (e) => {
    e.preventDefault()

    try {

      setError(false)
      setSuccess(false)

      if (nuevaCategoria === "") {
        return setError("Debes añadir una categoría.")
      }

      await axios.post(`${baseURL}/api/categorias`, { nuevaCategoria })

      setSuccess("Nueva categoría añadida.")
      setNuevaCategoria("")

      setTimeout(() => {
        window.location.reload()
      }, 1500)

    } catch (error) {
      setError(error.response.data)
      console.error(error.message)
    }
  }

  const getCategorias = async () => {
    const { data } = await axios.get(`${baseURL}/api/categorias`)
    setCategorias(data)
  }

  useEffect(() => {
    getCategorias()
  }, [])

  return (
    <>
      <Head>
        <title>Perfil de {usuario.nombre} | Fruto del Espíritu</title>
        <meta name="description" content={`${usuario.nombre} - autor de Fruto del Espíritu | Perfil`} />
        <meta name="keywords" content="autor cristiano, escritor cristiano, escritor de fe, fe cristiana, autor sobre la fe" />
        <meta name='robots' content='noindex, nofollow' />
      </Head>
      <PerfilHeader nombreUsuario={usuario.nombre} updatedAt={usuario.createdAt} correo={usuario.correo} />
      <section className="container-fluid">
        <div className="container-mid">
          <div className="perfil-acciones-wrapper">
            <div className="perfil-acciones">
              <h2>Acciones</h2>
            </div>
            <div className="perfil-acciones-sub">
              {isAdminOrJefe &&
                <div className="perfil-acciones-box">
                  <svg className="mr2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M9 19h-4v-2h4v2zm2.946-4.036l3.107 3.105-4.112.931 1.005-4.036zm12.054-5.839l-7.898 7.996-3.202-3.202 7.898-7.995 3.202 3.201zm-6 8.92v3.955h-16v-20h7.362c4.156 0 2.638 6 2.638 6s2.313-.635 4.067-.133l1.952-1.976c-2.214-2.807-5.762-5.891-7.83-5.891h-10.189v24h20v-7.98l-2 2.025z" /></svg>
                  <Link href="/publicar/lectura" className="btn btn-link"><a>Crear lectura</a></Link>
                </div>
              }
              <div className="perfil-acciones-box">
                <svg className="mr2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M18 13.408l2.963 2.592-2.963 2.592v-1.592h-6v-2h6v-1.592zm-2-4.408v4h-6v6h6v4l8-7-8-7zm0-2v-6h-16v18l8-7v-9h6v4h2z" /></svg>
                <p onClick={handleLogout} className="btn btn-link logout mb0">Terminar sesión</p>
              </div>
              <div className="perfil-acciones-box">
                <svg className="mr2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" /></svg>
                <p onClick={() => setShowModalEliminarCuenta(true)} className="btn btn-link logout mb0">Eliminar cuenta</p>
              </div>
            </div>

            {/* categories */}
            <div className="perfil-acciones">
              <h2>Categorías</h2>
            </div>
            <div>
              <div className="perfil-acciones-box">
                <svg className="mr2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" /></svg>
                <p onClick={() => setShowModalCrearCategoria(true)} className="btn btn-link logout mb0">Añade nueva categoría</p>
              </div>
              {categorias.length === 0
                ? (<div className="perfil-acciones-box">
                  <p className="m0">No has añadido categorías para tus publicaciones.</p>
                </div>)
                : categorias.map(c => (
                  <div key={c._id} className="perfil-acciones-edit-container">
                    <p className="m0">{c.nombre}</p>
                    <div className="perfil-acciones-btn-container">
                      <button onClick={() => obtenerCategoriaEditarId(c._id)} className="editar">Editar</button>
                      <button onClick={() => obtenerCategoriaId(c._id)} className="eliminar">Eliminar</button>
                    </div>
                  </div>
                ))
              }
            </div>

            <div className="perfil-acciones">
              <h2>Lecturas guardadas</h2>
            </div>
            {usuario.lecturasGuardadas.length ? usuario.lecturasGuardadas.map(l => (
              <div key={l._id} className="perfil-acciones-edit-container">
                <Link href={`${baseURL}/lecturas/lectura?slug=${l.lectura.slug}`}><a>{l.lectura.titulo}</a></Link>
              </div>
            )).reverse() : (
              <div className="perfil-acciones-sub">
                <div className="perfil-acciones-box">
                  <svg className="mr2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M16 10.975v13.025l-6-5.269-6 5.269v-24h6.816c-.553.576-1.004 1.251-1.316 2h-3.5v17.582l4-3.512 4 3.512v-8.763c.805.19 1.379.203 2 .156zm4-6.475c0 2.485-2.018 4.5-4.5 4.5-2.484 0-4.5-2.015-4.5-4.5s2.016-4.5 4.5-4.5c2.482 0 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z" /></svg>
                  <p className="mb0">Aún no has guardado ninguna lectura. Las lecturas que guardes aparecerán aquí.</p>
                </div>
              </div>
            )
            }
            {isAdminOrJefe &&
              <div className="perfil-acciones">
                <h2>Lecturas publicadas</h2>
              </div>
            }
            {isAdminOrJefe && publicadasPorUsuario.length ? publicadasPorUsuario.map(l => (
              <div key={l._id} className="perfil-acciones-edit-container">
                <Link href={`${baseURL}/lecturas/lectura?slug=${l.slug}`}><a>{l.titulo}</a></Link>
                <div className="perfil-acciones-btn-container">
                  <Link href={`/editar/lectura?slug=${l.slug}`}><a className="editar">
                    Editar</a>
                  </Link>
                  <button onClick={() => obtenerLecturaId(l._id)} className="eliminar">

                    Remover
                  </button>
                </div>
              </div>
            )).reverse() : isAdminOrJefe && (
              <div className="perfil-acciones-sub">
                <div className="perfil-acciones-box">
                  <svg className="mr2" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path d="M16 10.975v13.025l-6-5.269-6 5.269v-24h6.816c-.553.576-1.004 1.251-1.316 2h-3.5v17.582l4-3.512 4 3.512v-8.763c.805.19 1.379.203 2 .156zm4-6.475c0 2.485-2.018 4.5-4.5 4.5-2.484 0-4.5-2.015-4.5-4.5s2.016-4.5 4.5-4.5c2.482 0 4.5 2.015 4.5 4.5zm-2-.5h-2v-2h-1v2h-2v1h2v2h1v-2h2v-1z" /></svg>
                  <p className="mb0">Las lecturas que publiques aparecerán aquí.  <Link href="/publicar/lectura"><a>Publica una lectura</a></Link>.</p>
                </div>
              </div>
            )
            }
          </div>
        </div>
        {showModalEliminarLectura &&
          <div className="global-alert">
            <div className="alert-red flex-column">
              <svg onClick={() => setShowModalEliminarLectura(false)} className="alert-modal-remove" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z" /></svg>
              <p>¿Estás seguro que deseas eliminar la publicación?</p>
              <button onClick={() => removerLectura(lecturaId)}>Eliminar</button>
            </div>
          </div>
        }

        {showModalEliminarCuenta &&
          <div className="global-alert">
            <div className="alert-red flex-column">
              <svg onClick={() => setShowModalEliminarCuenta(false)} className="alert-modal-remove" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z" /></svg>
              <p>¿Estás seguro que deseas eliminar la tu cuenta? Todas tu publicaciones, escritas o guardadas serán eliminadas inmediatamente.</p>
              <button onClick={() => eliminarUsuario(usuario._id)}>Eliminar cuenta</button>
            </div>
          </div>
        }

        {/* modals para las categorias */}
        {showModalCrearCategoria &&
          <div className="global-alert">
            <div className="alert-white">
              <div className="flex flex-aics flex-jcsp w-100">
                <p className="m0"><strong>Añade nueva categoría</strong></p>
                <svg onClick={() => { setShowModalCrearCategoria(false) }} className="red" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" /></svg>
              </div>
              <form onSubmit={handleSubmitNuevaCategoria} className="mt3">
                <input onChange={handleNuevaCategoriaChange}
                  value={nuevaCategoria} type="text"
                  className="mb3"
                />
                {error &&
                  (<div className="alert-red mt3">
                    {error}
                  </div>)
                }
                {success &&
                  (<div className="alert-green mt3">
                    {success}
                  </div>)
                }
                <button className="mt3" type="submit">Añadir</button>
              </form>
            </div>
          </div>
        }

        {showModalEliminarCategoria &&
          <div className="global-alert">
            <div className="alert-red flex-column">
              <svg onClick={() => setShowModalEliminarCategoria(false)} className="alert-modal-remove" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z" /></svg>
              <p>¿Estás seguro que deseas eliminar esta categoría? Todas las lecturas relacionadas cambiarán a general.</p>
              {
                loading ? (<button>Procesando...</button>)
                  : (<button onClick={() => eliminarCategoria(categoriaId)}>Eliminar categoría</button>)
              }

            </div>
          </div>
        }

        {/* modals para las categorias */}
        {showModalEditarCategoria &&
          <div className="global-alert">
            <div className="alert-white">
              <div className="flex flex-aics flex-jcsp w-100">
                <p className="m0"><strong>Edita la siguiente categoría.</strong></p>
                <svg onClick={() => { setShowModalEditarCategoria(false) }} className="red" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" /></svg>
              </div>
              <form onSubmit={() => handleActualizarCategoria(categoriaId)} className="mt3">
                <input onChange={handleEditarCategoriaChange}
                  defaultValue={categoriaParaEditar} type="text"
                  className="mb3"
                />
                {error &&
                  (<div className="alert-red mt3">
                    {error}
                  </div>)
                }
                {success &&
                  (<div className="alert-green mt3">
                    {success}
                  </div>)
                }
                <button className="mt3" type="submit">Editar</button>
              </form>
            </div>
          </div>
        }
      </section>
    </>
  )
}

perfil.getInitialProps = async () => {
  const url = `${baseURL}/api/lecturas`
  const { data } = await axios.get(url)
  return { lecturas: data }
}

export default perfil
