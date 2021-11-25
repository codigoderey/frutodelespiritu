import axios from 'axios';
import Link from 'next/link';
import Head from "next/head"

const Libros = ({ books }) => {
  const pentateuco = books.data.slice(0, 5);
  const historicos = books.data.slice(5, 17);
  const poetiocs = books.data.slice(17, 22);
  const profetas = books.data.slice(22, 39);
  const evangelios = books.data.slice(39, 43);
  const historico = books.data.slice(43, 44);
  const cartas = books.data.slice(44, 65);
  const revelaciones = books.data.slice(65, 66);
  return (
    <>
      <Head>
        <title>Los libros de la biblia | Fruto del Espíritu</title>
        <meta name="description" content="Conoce todos los libros de la biblia, desde Génesis hasta apocalipsis" />
        <meta name="keywords" content="Estudia la biblia con nosotros. Fruto del Espíritu te ayuda vivir una vida práctica dirigida por el Espíritu Santo." />
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="container">
        <h1 className="biblia-header">Libros del Antiguo Testamento</h1>

        <div className="flex">
          <img className="biblia-libro-imagen" src="/bible-icons/pentateucos.png" />
          <h2 className="biblia-libro-indicador">Pentateucos</h2>
        </div>
        <div className="libros">
          {pentateuco.map((l) => (
            <Link
              key={l.id}
              href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}
            >
              <a className="pentateuco">{l.name}</a>
            </Link>
          ))}
        </div>
        <div className="flex">
          <img className="biblia-libro-imagen" src="/bible-icons/historia.png" />
          <h2 className="biblia-libro-indicador">Históricos</h2>
        </div>
        <div className="libros">
          {historicos.map((l) => (
            <Link
              key={l.id}
              href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}
            >
              <a className="historicos">{l.name}</a>
            </Link>
          ))}
        </div>
        <div className="flex">
          <img className="biblia-libro-imagen" src="/bible-icons/poeticos.png" />
          <h2 className="biblia-libro-indicador">Poéticos</h2>
        </div>
        <div className="libros">
          {poetiocs.map((l) => (
            <Link
              key={l.id}
              href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}
            >
              <a className="poeticos">{l.name}</a>
            </Link>
          ))}
        </div>
        <div className="flex">
          <img className="biblia-libro-imagen" src="/bible-icons/profetas.png" />
          <h2 className="biblia-libro-indicador">Profetas</h2>
        </div>
        <div className="libros">
          {profetas.map((l) => (
            <Link
              key={l.id}
              href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}
            >
              <a className="profetas">{l.name}</a>
            </Link>
          ))}
        </div>
        <h1 className="biblia-header">Libros del Nuevo Testamento</h1>
        <div className="flex">
          <img className="biblia-libro-imagen" src="/bible-icons/evangelios.png" />
          <h2 className="biblia-libro-indicador">Evangelios</h2>
        </div>
        <div className="libros">
          {evangelios.map((l) => (
            <Link
              key={l.id}
              href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}
            >
              <a className="evangelicos">{l.name}</a>
            </Link>
          ))}
        </div>
        <div className="flex">
          <img className="biblia-libro-imagen" src="/bible-icons/historia.png" />
          <h2 className="biblia-libro-indicador">Historia</h2>
        </div>
        <div className="libros">
          {historico.map((l) => (
            <Link
              key={l.id}
              href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}
            >
              <a className="historicos">{l.name}</a>
            </Link>
          ))}
        </div>
        <div className="flex">
          <img className="biblia-libro-imagen" src="/bible-icons/cartas.png" />
          <h2 className="biblia-libro-indicador">Cartas</h2>
        </div>
        <div className="libros">
          {cartas.map((l) => (
            <Link
              key={l.id}
              href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}
            >
              <a className="cartas">{l.name}</a>
            </Link>
          ))}
        </div>
        <div className="flex">
          <img className="biblia-libro-imagen" src="/bible-icons/revelaciones.png" />
          <h2 className="biblia-libro-indicador">Revelaciones</h2>
        </div>
        <div className="libros">
          {revelaciones.map((l) => (
            <Link
              key={l.id}
              href={`/biblia/capitulos?biblia=${l.bibleId}&libro=${l.id}`}
            >
              <a className="revelaciones">{l.name}</a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

Libros.getInitialProps = async ({ query }) => {
  const bibleVersionID = query.id;
  const url = `https://api.scripture.api.bible/v1/bibles/${bibleVersionID}/books`;
  const { data } = await axios.get(url, {
    headers: {
      'api-key': '8ac8aa678136bcd3e534f3ceab1cb7cc',
    },
  });
  return { books: data };
};

export default Libros;
