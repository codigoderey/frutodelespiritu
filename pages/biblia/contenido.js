import axios from 'axios';
import Link from 'next/link';


const Capitulos = ({ contenido }) => {

  const lectura = contenido.data.content;
  const data = contenido.data;
  const referencia = contenido.data.reference;

  return (
    <div className="container">
      <h1 className="biblia-contenido-header">{referencia}</h1>
      <div className="p2" dangerouslySetInnerHTML={{ __html: lectura }} />
      <div className="pagination">
        {data.previous && (
          <Link
            href={`/biblia/contenido?biblia=592420522e16049f-01&capitulo=${data.previous.id}`}
          >
            <a className="btn-link">Anterior</a>
          </Link>
        )}
        {data.next && (
          <Link
            href={`/biblia/contenido?biblia=592420522e16049f-01&capitulo=${data.next.id}`}
          >
            <a className="btn-link">Siguiente</a>
          </Link>
        )}
      </div>
    </div>
  );
};

Capitulos.getInitialProps = async (props) => {
  const { biblia, capitulo } = props.query;

  const url = `https://api.scripture.api.bible/v1/bibles/${biblia}/chapters/${capitulo}`;
  const { data } = await axios.get(url, {
    headers: {
      'content-type': 'application/json',
      'api-key': '8ac8aa678136bcd3e534f3ceab1cb7cc',
    },
  });

  return { contenido: data };
};

export default Capitulos;
