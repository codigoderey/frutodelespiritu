import baseURL from "../utils/baseURL"
import Head from "next/head"
import IndexHeader from "../components/Headers/IndexHeader"
const Home = () => {

  return (
    <>
      <Head>
        <title>Bienvenidos a Fruto del Espíritu</title>
        <meta name="description" content="Estudios Bíblicos y Lecturas relacionadas al ministerio de Jesucristo, llamados a vivir una vida práctica dirigidos por el Espíritu Santo." />
        <meta name="robots" content="index, follow" />
      </Head>
      <IndexHeader />
      {/* <header className="bg-bible-1">
        {baseURL === "http://localhost:3000" && <p className="alert-red">Recuerda utilizar la base de datos de prueba y cambiarla a la de producción cuando publiques la página. Además acuérdate de comentar el reftagger para limpiar el error de la consola.</p>}
        <div className="home-text">
          <h1>Fruto del Espíritu</h1>
        </div>
      </header> */}
    </>
  );
};

export default Home;
