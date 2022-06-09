import React, { useState, useEffect } from 'react'
import LecturaItem from '../Items/LecturaItem'
import axios from 'axios'
import baseURL from '../../utils/baseURL'

const BuscarLecturas = ({ lecturas, usuario }) => {

  const [resultadoLecturas, setResultadoLecturas] = useState(lecturas)
  const [categorias, setCategorias] = useState([])

  // get all categories
  useEffect(() => {
    getCategorias()
  }, [])

  const getCategorias = async () => {
    const { data } = await axios.get(`${baseURL}/api/categorias`)
    setCategorias(data)
  }

  // handle input search
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

  // handle select catgorie
  const handleSelectCategoria = (e) => {
    const categoria = e.target.value
    setResultadoLecturas(lecturas.filter(l => l.categoria === categoria))
  }

  return (
    <>
      <form>
        <div>
          <input
            onChange={handleInputChange}
            type="text"
            name="nombre"
            placeholder="Busca un tema, ej. amor"
          />
        </div>
        <div className="radio">
          {
            categorias.map(c => (
              <input
                key={c._id}
                label={c.nombre}
                type="radio"
                id="male"
                name="categoria"
                value={c.nombre}
                onChange={handleSelectCategoria}
              />
            ))
          }
        </div>
      </form>

      <LecturaItem resultadoLecturas={resultadoLecturas} lecturas={lecturas} usuario={usuario} />
    </>
  )
}

export default BuscarLecturas
