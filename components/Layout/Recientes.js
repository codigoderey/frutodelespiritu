import React, { useEffect, useState } from 'react'
import baseURL from "../../utils/baseURL"
import axios from "axios"


const Recientes = () => {

  const [lecturas, setLecturas] = useState(Array)

  useEffect(() => {
    getLecturas()
  }, [])

  const getLecturas = async () => {
    const url = `${baseURL}/api/lecturas`
    const { data } = await axios.get(url)
    setLecturas(data)
  }



  return (
    <div className="recientes p3">
      <h2>Recientes</h2>
      <ul>
        {lecturas.map(l => (
          <li key={l._id}><a href={`/lecturas/lectura?slug=${l.slug}`}>{l.titulo}</a></li>
        )).reverse().slice(0, 5)}
      </ul>
    </div>
  )
}

export default Recientes
