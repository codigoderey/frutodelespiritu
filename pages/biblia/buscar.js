import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from "next/head"

const Resultados = () => {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [resultado, setResultado] = useState([]);
  const [errorStatus, setErrorStatus] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrorStatus(false)

      const url = `https://api.scripture.api.bible/v1/bibles/592420522e16049f-01/search?query=${query}&limit=30`;
      const { data } = await axios.get(url, {
        headers: {
          'api-key': '8ac8aa678136bcd3e534f3ceab1cb7cc',
        },
      });

      setResultado(data.data.verses);

      if (data.data.verses.length === 0) {
        setErrorStatus(true)
        setErrorMessage("No se encontraron resultados")
        return
      }
      router.push('/biblia/buscar');

    } catch (error) {
      console.error(error.message);
      setErrorStatus(true)
      setErrorMessage("Debes ingresar una búsqueda")
      setResultado([])
    }
  };

  return (
    <>
      <Head>
        <title>Búsqueda de versículos bíblicos | Fruto del Espíritu</title>
        <meta name="description" content="Realiza una búsqueda de versículos bíblicos y encuentra lo que buscas casi al instante." />
        <meta name="keywords" content="busca versiculos en la biblia, encuentra versiculos biblicos, busca en la biblia" />
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="container search  mt3">
        <form className="flex" onSubmit={handleSearchSubmit}>
          <input
            className="mr2 p3"
            type="text"
            placeholder="Busca en la biblia"
            onChange={handleInputChange}
            value={query.text}
          />
          <button className="search-btn" type="submit">
            <svg className="m-0" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M13 10h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2zm8.172 14l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" /></svg>
          </button>
        </form>
      </div>
      {errorStatus &&
        <div className="alert-yellow"><i className="fas fa-exclamation mr2"></i><p className="mb0">{errorMessage}</p></div>
      }
      <div className="container biblia-resultados">
        <h2 className="ml2">Resultados...</h2>
        {resultado.map((r) => (
          <div key={r.id} className="mb2 mt2 ba p3 card">
            <p className="mb2">
              <strong>{r.reference}</strong>
            </p>
            <p className="mb3">{r.text}</p>
            <Link
              href={`/biblia/contenido?biblia=${r.bibleId}&capitulo=${r.chapterId}`}
            >
              <a className="mt2">Leer más</a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Resultados;
