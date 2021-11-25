import React from 'react'
import Link from "next/link"
import { useRouter } from "next/router"

const BottonNav = ({ usuario }) => {

  const router = useRouter()
  return (
    <div className="nav-bottom">
      <div className="nav-bottom-links-container">

        <div className="nav-bottom-link">
          <svg className={`${router.pathname === "/" && "active"}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 13v10h-6v-6h-6v6h-6v-10h-3l12-12 12 12h-3zm-1-5.907v-5.093h-3v2.093l3 3z" /></svg>
          <Link href="/"><a className={`${router.pathname === "/" && "active"}`}>Inicio</a></Link>
        </div>
        <div className="nav-bottom-link">
          <svg className={`${router.pathname === "/lecturas" || router.pathname === "/lecturas/lectura" || router.pathname === "/publicar/lectura" || router.pathname === "/lecturas/categorias/reflexiones" || router.pathname === "/lecturas/categorias/estudios-biblicos" ? "active" : ""}`} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M22.298 24h-5.469c-.182-2.287-1.893-4.311-3.43-5.941-.267-.283-.399-.611-.399-.908 0-.538.415-.979 1.105-.874.662.101 1.374.761 1.63 1.033v-5.175c0-.627.503-1.135 1.094-1.135.591 0 1.094.508 1.094 1.135v2.591c0 .454.445.513.502.059.118-.93 1.378-1.054 1.474.232.023.316.396.38.474.015.178-.837 1.367-.845 1.508.44.036.336.435.404.463.02.028-.388.155-.541.333-.541.6 0 1.262 1.17 1.262 2.557 0 2.492-1.641 2.498-1.641 6.492zm-9.798-21.586c2.933-1.617 7.169-2.282 11.5-2.414v13.644l-4.178-1.179c0-.145 0-.491-.014-.635-.14-1.419-1.295-2.698-2.979-2.73-1.729.048-2.866 1.303-2.991 2.882-.005.209-.003 2.166-.003 2.382-1.099 0-2.222.703-2.607 1.935-.21.678-.154 1.414.126 2.064.301.698.695 1.02 1.206 1.588-.636.113-1.295.032-1.893-.241-2.872-1.315-6.73-1.875-10.667-1.995v-17.715c4.331.132 8.568.797 11.5 2.414v10.586l1-.483v-10.103zm-9.5 10.317c2.086.312 4.451 1.024 6 1.673v-1.064c-1.668-.622-3.881-1.315-6-1.626v1.017zm0-2.031c2.086.312 4.451 1.023 6 1.672v-1.063c-1.668-.622-3.881-1.316-6-1.626v1.017zm0-2.031c2.086.311 4.451 1.023 6 1.673v-1.064c-1.668-.622-3.881-1.316-6-1.626v1.017zm0-2.031c2.086.311 4.451 1.023 6 1.672v-1.064c-1.668-.622-3.881-1.315-6-1.626v1.018zm18-1.018c-2.119.311-4.332 1.004-6 1.626v1.064c1.549-.649 3.914-1.361 6-1.672v-1.018zm-18-2.041c2.119.31 4.332 1.004 6 1.626v1.064c-1.549-.65-3.914-1.361-6-1.673v-1.017zm18 1.017c-2.086.312-4.451 1.023-6 1.673v-1.064c1.668-.622 3.881-1.316 6-1.626v1.017z" /></svg>
          <Link href="/lecturas"><a className={`${router.pathname === "/lecturas" || router.pathname === "/lecturas/lectura" || router.pathname === "/publicar/lectura" || router.pathname === "/lecturas/categorias/reflexiones" || router.pathname === "/lecturas/categorias/estudios-biblicos" ? "active" : ""}`}>Lecturas</a>
          </Link>
        </div>
        <div className="nav-bottom-link">
          <svg className={`${router.pathname === "/biblia/libros" ||
            router.pathname === "/biblia/capitulos" ||
            router.pathname === "/biblia/contenido" ||
            router.pathname === "/biblia/buscar" ? "active" : ""}`} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M21 24h-18v-4.144l4-3.536v-3.9l5-4.42 5 4.42v3.904l4 3.536v4.14zm-7-1v-3c0-1.104-.896-2-2-2s-2 .896-2 2v3h4zm4-9.849l6 5.356-1.328 1.493-4.672-4.184v-2.665zm-12 0l-6 5.356 1.328 1.493 4.672-4.184v-2.665zm7 1.849v-2c0-.552-.448-1-1-1s-1 .448-1 1v2h2zm-4-13h2v-2h2v2h2v2h-2v.751l7 6.249-1.328 1.493-6.672-5.975-6.672 5.975-1.328-1.493 7-6.22v-.78h-2v-2z" /></svg>

          <Link href="/biblia/libros?id=592420522e16049f-01"><a className={`${router.pathname === "/biblia/libros" ||
            router.pathname === "/biblia/capitulos" ||
            router.pathname === "/biblia/contenido" ||
            router.pathname === "/biblia/buscar" ? "active" : ""}`}>Biblia</a>
          </Link>
        </div>
        {!usuario ?

          <div className="nav-bottom-link active">
            <svg className={`${router.pathname === "/ingresar" || router.pathname === "/registrarme" ? "active" : ""}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8 12v-4l8 7-8 7v-4h-8v-6h8zm2-5.024v-2.976h6v8.051l8 6.767v-16.818h-16v3.284l2 1.692z" /></svg>
            <Link href="/ingresar"><a className={`${router.pathname === "/ingresar" || router.pathname === "/registrarme" ? "active" : ""}`}>Ingresar</a></Link>
          </div>
          :
          <div className="nav-bottom-link active">
            <svg className={`${router.pathname === "/perfil" && "active"}`} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z" /></svg>
            <Link href="/perfil"><a className={`${router.pathname === "/perfil" && "active"}`}>Perfil</a></Link>
          </div>}
      </div>
    </div>
  )
}

export default BottonNav
