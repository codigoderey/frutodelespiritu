import React, { useState } from 'react'
import Link from "next/link"
import axios from "axios"
import baseURL from "../../utils/baseURL"
import { handleLogin } from "../../utils/auth"
import { useRouter } from "next/router"

const Registrarme = () => {

  const router = useRouter()

  const [usuario, setUsuario] = useState({
    correo: "",
    contrasena: "",
    confirmar: "",
  })

  const [errorStatus, setErrorStatus] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const { correo, contrasena, confirmar } = usuario

  const handleInputChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  const handleFormRegistrarme = async (e) => {
    e.preventDefault()

    try {
      setErrorStatus(false)

      if (correo === "" || contrasena === "" || confirmar === "") {
        setErrorStatus(true)
        setErrorMessage("Todos los blancos son requeridos")
        return
      } else if (contrasena !== confirmar) {
        setErrorStatus(true)
        setErrorMessage("Las contraseñas son diferentes")
        return
      }
      const url = `${baseURL}/api/contrasena`

      const { data } = await axios.put(url, usuario)

      setUsuario({
        correo: "",
        contrasena: "",
        confirmar: ""
      })

      // this function will set the token from the json response and place it in a cookie
      router.push("/ingresar")

    } catch (error) {
      console.error(error)
      setErrorStatus(true)
      setErrorMessage(error.response.data)
    }
  }

  return (
    <form onSubmit={handleFormRegistrarme} className="container p2 mb3">
      <div className="form-input-group">
        <input type="email" name="correo" placeholder="Correo electrónico" onChange={handleInputChange} value={correo} />
      </div>

      <div className="form-input-group">
        <input type="password" name="contrasena" placeholder="Nueva contraseña" onChange={handleInputChange} value={contrasena} />
      </div>

      <div className="form-input-group">
        <input type="password" name="confirmar" placeholder="Confirma nueva contraseña" onChange={handleInputChange} value={confirmar} />
      </div>

      {errorStatus &&
        <div className="alert-red">
          <svg style={{ marginRight: ".5rem" }} fill="#fff" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16.971 0h-9.942l-7.029 7.029v9.941l7.029 7.03h9.941l7.03-7.029v-9.942l-7.029-7.029zm-4.971 19.25c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm.5-4.25h-1l-1-10h3l-1 10z" /></svg>
          <p>{errorMessage}</p>
        </div>
      }

      <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M9 19h-4v-2h4v2zm2.946-4.036l3.107 3.105-4.112.931 1.005-4.036zm12.054-5.839l-7.898 7.996-3.202-3.202 7.898-7.995 3.202 3.201zm-6 8.92v3.955h-16v-20h7.362c4.156 0 2.638 6 2.638 6s2.313-.635 4.067-.133l1.952-1.976c-2.214-2.807-5.762-5.891-7.83-5.891h-10.189v24h20v-7.98l-2 2.025z" /></svg>Actualizar</button>

      <div>
        <p>Si tu token ha expirado puedes solicitar otro <Link href="/recupera-contrasena"><a className="btn-link">aquí</a></Link></p>
      </div>
    </form>
  )
}

export default Registrarme
