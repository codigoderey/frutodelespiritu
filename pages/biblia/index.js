import axios from 'axios';
import Link from 'next/link';
import Head from "next/head"

const BibliaIndex = (data) => {
  const bible = data.bibles.data.filter((b) => b.id === '592420522e16049f-01');

  return (
    <>
      <Head>
        <title>Lee la biblia | Fruto del Espíritu</title>
        <meta name="description" content="Estudia las escrituras, la biblia con nosotros" />
        <meta name="keywords" content="Estudia la biblia con nosotros. Fruto del Espíritu te ayuda vivir una vida práctica dirigida por el Espíritu Santo." />
        <meta name="robots" content="index, follow" />
      </Head>
      <div className="container">
        <h1 className="biblia-header">Biblias Disponibles</h1>

        {bible.map((b) => (
          <article className="card" key={b.id}>
            <div className="flex">
              <h2>{b.nameLocal}</h2>
              <Link href={`/libros?id=${b.id}`}>
                <a>Leer</a>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

BibliaIndex.getInitialProps = async () => {
  const url = 'https://api.scripture.api.bible/v1/bibles';
  const { data } = await axios.get(url, {
    headers: {
      'api-key': '8ac8aa678136bcd3e534f3ceab1cb7cc',
    },
  });
  return { bibles: data };
};

export default BibliaIndex;
