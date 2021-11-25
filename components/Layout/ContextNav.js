import { useRouter } from "next/router"

const Nav = () => {
  const router = useRouter()
  return (
    <>
      {router.pathname === "/biblia/libros" || router.pathname === "/biblia/capitulos" || router.pathname === "/biblia/contenido" || router.pathname === "/biblia/buscar" ?

        <nav className="flex align-items-center justify-content-between p3">
          <div className="search">
            <a className="flex" href="/biblia/libros?id=592420522e16049f-01">
              <img className="mr2 nav-icon" src="/bible-search.svg" />
              Reina Valera 1960
            </a>
          </div>
          <div className="nav-logo">
            <a href="/"><img src="/logo.png" /></a>
          </div>
          <div className="search">
            <a className="flex" href="/biblia/buscar">
              Busca en la biblia
              <img className="ml2 nav-icon" src="/bible-search.svg" />
            </a>
          </div>
        </nav> :
        null
      }
    </>
  );
};

export default Nav;
