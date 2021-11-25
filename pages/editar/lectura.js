import EditarLectura from "../../components/Formularios/EditarLectura"
import baseURL from "../../utils/baseURL"
import axios from "axios"
import Head from "next/head"

const lectura = ({ usuario, lectura }) => {
  return (
    <>
      <Head>
        <title>Editar publicación | Fruto del Espíritu</title>
        <meta name="description" content="Estudia las escrituras, la biblia con nosotros" />
      </Head>
      <div>
        <EditarLectura usuario={usuario} lectura={lectura} />
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