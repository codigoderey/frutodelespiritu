import LecturasHeader from "../components/Headers/LecturasHeader"
import Head from "next/head"

const nosotros = () => {

  return (
    <>
      <Head>
        <title>Ministerio decidido a llevar el mensaje de una vida práctica en el Espíritu Santo | Fruto del Espíritu</title>
        <meta name="description" content="Somos un ministerio decidido a llevar el mensaje de una vida práctica dirigida por el Espíritu Santo." />
        <meta name="robots" content="index, follow" />
      </Head>
      <LecturasHeader tema="Sobre nosotros" />
      <article className="container p2">
        <section className="mt5">
          <h1 className="mb2">¿Quienes somos?</h1>
          <p>El ministerio Fruto del Espíritu se dedica a escribir publicaciones para aprender sobre diferentes temas bíblicos.  Aquí puedes encontrar reflexiones y estudios bíblicos con el fin de edificar el cuerpo de Cristo.</p>
        </section>

        <section className="mt5">
          <h1 className="mb2">¿Cual es nuestra visión?</h1>
          <p>Tenemos la visión de un pueblo unido bajo la vida de Jesucristo.  Cero divisiones, más unidad en el vínculo de la paz que es Cristo Jesús.</p>
        </section>

        <section className="mt5">
          <h1 className="mb2">¿Cual es nuestra misión?</h1>
          <p>Evangelizar la palabra de Dios y edificar el pueblo de Dios con un mensaje Cristo céntrico que busque la unidad de Su pueblo y el bienestar común en lugar de enfocarse en aquellas cosas que nos dividen.</p>
        </section>

        <section className="mt5">
          <h1 className="mb2">¿Qué puedo hacer en esta página?</h1>
          <p>Puedes consumir lecturas y estudios bíblicos para edificarte, sin embargo, si quieres sacarle el máximo, puedes crear una cuenta y guardar lecturas y estudios bíblicos en tu perfil. Es una manera fácil y segura de regresar a esas lecturas que puedes utilizar como recursos.  Además, si quieres escribir para nosotros, continúa leyendo para que aprendas cómo puedes hacerlo.</p>
        </section>

        <section className="mt5">
          <h1 className="mb2">¿Quieres unirte a nuestro cuerpo de escritores?</h1>
          <p><a href="mailto: reynaldo@frutodelespiritu.com?subject=Quiero ser parte del equipo de escritores">Escríbenos por correo electrónico</a> a y déjanos saber que estás interesad@ en unirte a nuestro cuerpo de escritores.</p>
        </section>
      </article>
    </>
  )
}

export default nosotros
