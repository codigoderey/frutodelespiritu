import LecturasHeader from "../components/Headers/LecturasHeader"
import Registrarme from '../components/Formularios/Registrarme'
import Head from "next/head"

const registrarme = () => {

  return (
    <div>
      <Head>
        <title>Crea una cuenta con Fruto del Espíritu</title>
        <meta name="description" content="Al registrarte podrás guardar lecturas, estudios bíblicos como referencia y solicitar privilegios de administrador para ser un autor." />
        <meta name="keywords" content="escritor cristiano, escritor sobre la fe, autor cristiano, autor de la fe, escritor religioso" />
        <meta name="robots" content="index, follow" />
      </Head>
      <LecturasHeader tema="Registrarme" />
      <Registrarme />
    </div>
  )
}

export default registrarme
