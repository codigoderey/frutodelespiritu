import NuevaLectura from '../../components/Formularios/NuevaLectura'
import Head from "next/head"
import axios from "axios"
import baseURL from '../../utils/baseURL'

const nuevaLectura = ({ usuario, categorias }) => {
  return (
    <>
      <Head>
        <title>Publica nueva lectura | Fruto del Espíritu</title>
      </Head>
      <NuevaLectura usuario={usuario} categorias={categorias} />
    </>
  )
}

nuevaLectura.getInitialProps = async () => {
  const { data } = await axios.get(`${baseURL}/api/categorias`)
  console.log(data)
  return { categorias: data }
}

export default nuevaLectura


