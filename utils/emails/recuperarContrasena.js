import fetch from 'node-fetch'

const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send'

const recuperarContrasena = async ({ email, nombre, resetURL }) => {

  try {
    await fetch(SENDGRID_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [
              {
                email
              }
            ],
            subject: 'Recupera tu contraseña'
          }
        ],
        from: {
          email: 'noreply@frutodelespiritu.com',
          name: 'Fruto del Espíritu'
        },
        content: [
          {
            type: 'text/html',
            value: `
            <div style="max-width: 600px; margin: 0 auto">
        
              <section>

                <h1>Recupera tu contraseña</h1>
                
                <p>${nombre}, se nos ha solicitado un token para recuperar contraseña.</b></p>

                <p>Recupera tu contraseña <a href=${resetURL}>oprimiendo este enlace</a>.</p>

                <p>Si no solicitó este mensaje, por favor verifique su cuenta y cambie su contraseña.</p>

                <p>Visita nuestra página <a href="https://frutodelespiritu.com">Fruto del Espíritu</a> y continúa leyendo palabra
                  que edifica.</p>

              </section>
          
              <section style="margin-top: 4rem">

                <div style="width: 100%;">
                  <img width=100 height="auto"
                    src="https://frutodelespiritu.com/logo.png" />
                </div>

                <p><strong>Cordialmente,</strong></p>

                <p style="margin: 0;">Reynaldo Navedo</p>

                <p style="margin: 0;">Fruto del Espíritu</p>

              </section>
            </div>
            `
          }
        ]
      })
    });
  } catch (error) {
    console.error(error)
  }
}

export { recuperarContrasena };