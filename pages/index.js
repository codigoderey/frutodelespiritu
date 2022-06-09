import Head from "next/head"
import IndexHeader from "../components/Headers/IndexHeader"

const Home = () => {
  return (
    <>
      <Head>
        <title>Fruto del Espíritu - tu recurso de reflexiones y estudios bíblicos</title>
        <meta name="description" content="Utiliza nuestras reflexiones para meditar sobre la Palabra de Dios o entra más profunto al conocimiento de Dios a través de los Estudios Bíblicos." />
        <meta property="og:title" content="Fruto del Espíritu - tu recurso de reflexiones y estudios bíblicos" />
        <meta property="og:description" content="Utiliza nuestras reflexiones para meditar sobre la Palabra de Dios o entra más profunto al conocimiento de Dios a través de los Estudios Bíblicos." />
        <meta property="og:locale" content="es_US" />
        <meta property="og:image" content="https://frutodelespiritu.com/logo.png" />
        <meta property="og:url" content="https://frutodelespiritu.com/lecturas" />
      </Head>
      <IndexHeader />
    </>
  );
};

export default Home;
