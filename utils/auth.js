import cookie from 'js-cookie'
import Router from "next/router"

export function handleLogin(token) {
  cookie.set("token", token)
  Router.push("/perfil")
}

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, {
      Location: location
    })
    ctx.res.end()
  } else {
    Router.push(location)
  }
}

export const handleLogout = () => {
  cookie.remove('token');
  Router.push('/ingresar');
};