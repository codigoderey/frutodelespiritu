import { useState } from "react"
import Column70 from "../../components/Layout/Column70"
import Column30 from "../../components/Layout/Column30"
import LecturasHeader from '../../components/Headers/LecturasHeader'
import Recientes from '../../components/Layout/Recientes'
import baseURL from '../../utils/baseURL'
import axios from 'axios'
import Moment from "react-moment"
import Link from "next/link"
import Head from "next/head"

const lecturas = ({ lecturas, usuario }) => {

  const [resultadoLecturas, setResultadoLecturas] = useState(lecturas)

  const handleInputChange = (e) => {
    const query = e.target.value
    const listaDeLecturas = lecturas.filter(a => {
      const { titulo, resumen } = a
      return (
        titulo.toLowerCase().includes(query.toLowerCase()) ||
        resumen.toLowerCase().includes(query.toLowerCase()
        ))
    })
    setResultadoLecturas(listaDeLecturas)
  }

  return (
    <>
      <Head>
        <title>Publicaciones y reflexiones sobre la biblia gratis | Fruto del Espíritu</title>
        <meta name="description" content="Estudia las escrituras, aprende a estudiar y entender la biblia a través de estudios bíblicos, lecturas y publicaciones que nos ayudan a vivir una vida práctica dirigida por el Espíritu Santo." />
        <meta name="keywords" content="estudios biblicos, estudia la biblia, entiende la biblia, espiritu santo" />
      </Head>
      <LecturasHeader tema="Lecturas" />
      <div className="container-full p2">
        <Column70>
          <form>
            <div>
              <input
                onChange={handleInputChange}
                type="text"
                name="nombre"
                // value={nombre}
                placeholder="Busca un tema, ej. amor"

              />
            </div>
          </form>
          {resultadoLecturas.length === 0
            ? (<div className="lectura-list-container"><p className="p2">No hay lecturas por el momento</p></div>)
            : resultadoLecturas.map(l => (
              <div key={l._id} className="lectura-list-container">
                <div className="lectura-list-body p3">
                  <a href={`/lecturas/lectura?slug=${l.slug}`}><h1>{l.titulo}</h1></a>
                  <div className="data">
                    <span className="mr2">Categoría: {l.categoria}</span>
                    <span className="divisor ml2 mr2">|</span>
                    <span>Escrito por <Link href={`${usuario && usuario.nombre === l.publicadoPor.nombre ? "/perfil" : `/usuario?id=${l.publicadoPor._id}`}`}>{l.publicadoPor.nombre}</Link></span>
                    <span className="divisor ml2 mr2">|</span>
                    <span>Publicado <Moment locale="es" fromNow>{l.createdAt}</Moment></span>
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: l.resumen }} />
                </div>
              </div>
            )).reverse()}
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
