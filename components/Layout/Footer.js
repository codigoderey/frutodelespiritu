import React from 'react'
import { useRouter } from "next/router"
import SubscriptoresMailchimp from "../SubscriptoresMailchimp"

const Footer = () => {
  const router = useRouter()
  return (
    <>
      {router.pathname === "/" ? null
        :
        <footer>
          <SubscriptoresMailchimp />
          <div className="footer">
            <section className="footer-info p3">
              <h3 className="mb2">¿Quienes somos?</h3>
              <p>Fruto del Espíritu se dedica a enseñar la palabra de Dios a través de lecturas que edifican al creyente, así como al cuerpo de Cristo.</p>
              <img width="75px" src="/logo.png" className="mb3" />
            </section>
            <section className="footer-links p3">
              <h3 className="mb2">Información adicional</h3>
              <ul className="">
                <li><a href="/nosotros">Sobre nosotros</a></li>
                <li><a href="/privacidad">Privacidad</a></li>
                <li><a href="mailto: reynaldo@frutodelespiritu.com?subject=Solicito información">Escríbenos</a></li>
              </ul>
            </section>
          </div>
          <div className="footer-copyrights">
            <p> Todos los derechos reservados <a href="/">Fruto del Espíritu</a> &copy;{new Date().getFullYear()} </p>
          </div>
        </footer>
      }
    </>

  )
}

export default Footer
