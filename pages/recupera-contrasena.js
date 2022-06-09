import LecturasHeader from "../components/Headers/LecturasHeader"
import RecuperarContrasena from '../components/Formularios/RecuperarContrasena'
import Head from "next/head"


const recuperaContrasena = () => {

  return (
    <>
      <Head>
        <title>Recupera tu contraseńa | Fruto del Espíritu</title>
        <meta name="description" content="Si olvidaste tu contraseña, puedes recuperarla en este enlace." />
      </Head>
      <LecturasHeader tema="Recupera tu contraseña" />
      <RecuperarContrasena />
    </>
  )
}

export default recuperaContrasena
