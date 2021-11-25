import LecturasHeader from "../components/Headers/LecturasHeader"
import Ingresar from '../components/Formularios/Ingresar'
import Head from "next/head"

const ingresar = () => {
  return (
    <>
      <Head>
        <title>Ingresa con tus credenciales | Fruto del Espíritu</title>
        <meta name="robots" content="index, follow" />
      </Head>
      <LecturasHeader tema="Ingresar" />
      <Ingresar />
    </>
  )
}

export default ingresar
