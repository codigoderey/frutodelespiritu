import MainLayout from '../components/Layout/MainLayout';
import '../styles/globals.css';
import "../styles/loaders.css"
import Head from 'next/head';
import { parseCookies } from "nookies"
import { redirectUser } from "../utils/auth"
import axios from 'axios';
import baseURL from "../utils/baseURL"

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* favicon logo */}
        <link rel="icon" type="img/png" href="/logo.png" />
        {/* reftagger bible script */}
        <script type="text/javascript" src="/js/reftagger.js" />
        {/* viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="ISO-8859–1" />
        <meta name="keywords" content="cristianismo, fruto del espiritu, la biblia, biblia en linea, dios, cristo, jesus, espiritu santo, escuela biblica" />
        <meta name="copyright" content="Todos los derechos reservados" />
      </Head>
      <MainLayout {...pageProps}>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { token } = parseCookies(ctx)

  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  if (!token) {
    const isProtectedRoute = ctx.pathname === "/perfil" || ctx.pathname === "/publicar/lectura" || ctx.pathname === "/editar/lectura"

    if (isProtectedRoute) {
      redirectUser(ctx, "/ingresar")
    }
  } else {

    try {
      const payload = { headers: { Authorization: token } }

      const { data } = await axios.get(`${baseURL}/api/usuarios`, payload)
      const usuario = data
      pageProps.usuario = usuario

    } catch (error) {
      console.error(error)
    }
  }

  return { pageProps: pageProps }
}
