import React, { useState } from 'react'
import Link from "next/link"
import axios from "axios"
import baseURL from "../../utils/baseURL"

const RecuperarContrasena = () => {
  const [correo, setCorreo] = useState({
    correo: ""
  })
  const [errorStatus, setErrorStatus] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [success, setSuccess] = useState(false)

  const handleInputChange = (e) => {
    setCorreo({
      ...correo,
      [e.target.name]: e.target.value
    })
  }

  const handleFormRecuperar = async (e) => {
    e.preventDefault()
    setErrorStatus(false)

    try {
      if (correo.correo === "") {
        setSuccess(false)
        setErrorStatus(true)
        setErrorMessage("Ingresa un correo electrónico")
        return
      }
      const url = `${baseURL}/api/contrasena`
      await axios.post(url, correo)
      setCorreo({
        correo: ""
      })
      setSuccess(true)

    } catch (error) {
      setSuccess(false)
      setErrorStatus(true)
      setErrorMessage(error.response.data)
      console.error(error.response)
    }
  }


  return (
    <form onSubmit={handleFormRecuperar} className="container p2 mb3">

      <div className="form-input-group">
        <input type="email" name="correo" placeholder="Correo electrónico" onChange={handleInputChange} value={correo.correo} />
      </div>

      {errorStatus &&
        <div className="alert-red">
          <svg style={{ marginRight: ".5rem" }} fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.971 0h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm-4.971 19.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm.5-4.25h-1l-1-10h3l-1 10z" /></svg>
          <p>{errorMessage}</p>
        </div>
      }

      {success &&
        <div className="alert-green">
          Se ha enviado un enlace para recuperar tu contraseña. Verifica tu correo electrónico.
        </div>
      }

      <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M9 19h-4v-2h4v2zm2.946-4.036l3.107 3.105-4.112.931 1.005-4.036zm12.054-5.839l-7.898 7.996-3.202-3.202 7.898-7.995 3.202 3.201zm-6 8.92v3.955h-16v-20h7.362c4.156 0 2.638 6 2.638 6s2.313-.635 4.067-.133l1.952-1.976c-2.214-2.807-5.762-5.891-7.83-5.891h-10.189v24h20v-7.98l-2 2.025z" /></svg>Recuperar</button>

      <div>
        <p className="mb2">Si aún no tienes cuenta puedes crearla <Link href="/registrarme"><a className="btn-link">aquí</a></Link>.</p>
        <p className="mb2">Si te acordaste de tu contraseña puedes ingresar <Link href="/ingresar"><a className="btn-link">aquí</a></Link>.</p>
      </div>
    </form>
  )
}

export default RecuperarContrasena
