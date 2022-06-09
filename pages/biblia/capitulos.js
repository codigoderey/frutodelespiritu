import Link from 'next/link';
import axios from 'axios';
import Head from "next/head"

const Capitulos = ({ capitulos }) => {
  const libro = capitulos.data[0].reference;

  return (
    <>
      <Head>
        <title>Capítulos de la biblia | Fruto del Espíritu</title>
        <meta name="description" content="Capítulos del libro" />
        <meta name="keywords" content="busca versiculos en la biblia, encuentra versiculos biblicos, busca en la biblia" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="container">
        <h1 className="biblia-header">Capítulos del libro de {libro}</h1>
        <div className="libros">
          {capitulos.data.map((c) => (
            <Link
              key={c.id}
              href={`/biblia/contenido?biblia=${c.bibleId}&capitulo=${c.id}`}
            >
              <a>{c.number}</a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

Capitulos.getInitialProps = async (props) => {
  const { biblia, libro } = props.query;
  const url = `https://api.scripture.api.bible/v1/bibles/${biblia}/books/${libro}/chapters`;
  const { data } = await axios.get(url, {
    headers: {
      'api-key': '8ac8aa678136bcd3e534f3ceab1cb7cc',
    },
  });

  return { capitulos: data };
};

export default Capitulos;
