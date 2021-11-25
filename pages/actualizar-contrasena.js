import LecturasHeader from '../components/Headers/LecturasHeader'
import ActualizarContrasena from "../components/Formularios/ActualizarContrasena"
import baseURL from '../utils/baseURL'
import axios from 'axios'
import Head from "next/head"

const nuevaContrasena = () => {
  return (
    <>
      <Head>
        <title>Actualiza tu contraseña | Fruto del Espíritu</title>
      </Head>
      <LecturasHeader />
      <ActualizarContrasena />
    </>
  )
}

nuevaContrasena.getInitialProps = async ({ query: { token } }) => {
  const url = `${baseURL}/api/contrasena`
  const payload = { params: { token } }
  const { data } = await axios.get(url, payload)
  return { token: data }
}


export default nuevaContrasena
