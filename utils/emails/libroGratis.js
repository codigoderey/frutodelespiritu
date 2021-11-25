import fetch from 'node-fetch'

const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send'

const libroGratis = async ({ name, email }) => {

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
            subject: 'Tu libro gratis, cortesía de Fruto del Espíritu'
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

            <section style="width: 100%">
              <img style="width: 100%; height: 150px; object-fit: cover;"
                src="https://media.istockphoto.com/photos/woman-hands-praying-for-blessing-from-god-on-sunset-background-picture-id1127245421?k=6&m=1127245421&s=612x612&w=0&h=-B5WkraDPZpn2cQDxhsQpHbm7CucqXnE9gKEXsX3T_o=" />
            </section>
          
            <section>
              <h1><b>${name}:</b></h1>
              <p>Oprime el siguiente enlace para descargar tu libro devocional <b>El Fruto del Espíritu.</b></p>
              <a style="background-color: #078B8F; color: #fff; padding: 4px 12px; text-decoration: none; border-radius: 4px;"
                href="https://frutodelespiritu.com/descargas/frutodelespiritu.pdf">Descargar</a>
              <p>Visita nuestra página <a href="https://frutodelespiritu.com">Fruto del Espíritu</a> y continúa leyendo palabra
                que edifica, levanta y restaura.</p>
            </section>
          
            <section style="margin-top: 4rem">
              <div style="width: 100%;">
                <img width=100 height="auto" src="https://frutodelespiritu.com/logo.png" />
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

export { libroGratis };