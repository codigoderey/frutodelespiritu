import LecturasHeader from "../components/Headers/LecturasHeader"
import Head from "next/head"

const privacidad = () => {
  return (
    <>
      <Head>
        <title>Política de privacidad de Fruto del Espíritu</title>
        <meta name="description" content="Conoce nuestra política de privacidad, tomamos muy en serio tu información." />
        <meta name="keywords" content="política de privacidad, privacidad fruto del espiritu" />
        <meta name="robots" content="index, follow" />
      </Head>
      <LecturasHeader tema="Privacidad" />
      <article className="container p2">
        <section className="mt5">
          <h1 className="mb2">Nuestra política de privacidad</h1>
          <ul>
            <li>Usted tiene la opción de registrar una cuenta con nosotros.</li>
            <li>Nosotros no vendemos su información bajo ninguna circunstancia.</li>
            <li>Toda la información queda guardada y encriptada en la base de datos, incluyendo las contraseñas son escondidads y nadie puede acceder a ellas.</li>
            <li>En este momento solo solicitamos su nombre, correo electrónico y una contraseña.</li>
            <li>Los correos electrónicos que recibirá como parte de su seguridad son aquellos necesarios para darle la bienvenida al sitio, recuperar su contraseña y confirmar la actualización de su información.</li>
            <li>Si usted se ha suscrito a los correos electrónicos de Mail Chimp, visite <a href="https://mailchimp.com/legal/privacy/">la política de privacidad de Mail Chimp</a>. Nosotros solo utilizamos esa información para enviarles correos en masa a nuestros suscriptores.</li>
          </ul>
        </section>
      </article>
    </>
  )
}

export default privacidad
