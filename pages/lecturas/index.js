import Column70 from "../../components/Layout/Column70"
import Column30 from "../../components/Layout/Column30"
import LecturasHeader from '../../components/Headers/LecturasHeader'
import Recientes from '../../components/Layout/Recientes'
import baseURL from '../../utils/baseURL'
import axios from 'axios'
import Head from "next/head"
import BuscarLecturas from "../../components/Formularios/BuscarLecturas"

const lecturas = ({ lecturas, usuario }) => {

  return (
    <>
      <Head>
        <title>Reflexiones y Estudios Bíblicos que te ayudarán a crecer espiritualmente | Fruto del Espíritu</title>
        <meta name="description" content="Estudia las escrituras, aprende a estudiar y entender la biblia a través de estudios bíblicos, lecturas y publicaciones que nos ayudan a vivir una vida práctica dirigida por el Espíritu Santo." />
        <meta name="keywords" content="estudios biblicos, estudia la biblia, entiende la biblia, espiritu santo" />
        <meta property="og:title" content="Reflexiones y Estudios Bíblicos que te ayudarán a crecer espiritualmente | Fruto del Espíritu" />
        <meta property="og:description" content="Estudia las escrituras, aprende a estudiar y entender la biblia a través de estudios bíblicos, lecturas y publicaciones que nos ayudan a vivir una vida práctica dirigida por el Espíritu Santo." />
        <meta property="og:locale" content="es_US" />
        <meta property="og:image" content="https://frutodelespiritu.com/logo.png" />
        <meta property="og:url" content="https://frutodelespiritu.com/lecturas/" />
      </Head>
      <LecturasHeader
        tema="Lecturas"
        imgSrc="/bg-bible-2.jpeg"
      />
      <div className="container-full p2">
        <Column70>
          <BuscarLecturas lecturas={lecturas} usuario={usuario} />
        </Column70>
        <Column30>
          <Recientes />
        </Column30>
      </div>
    </>
  )
}

lecturas.getInitialProps = async () => {
  const url = `${baseURL}/api/lecturas`
  const { data } = await axios.get(url)
  return { lecturas: data }
}

export default lecturas
