import nodemailer from "nodemailer"

export default async (req, res) => {

  const { nombre, correo } = req.body

  try {

    // // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASS, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // correo body
    const output = `
      <div style="max-width: 600px; margin: 0 auto">
        <section>
          <h1><b>${nombre}:</b></h1>
          <p>Oprime el siguiente enlace para descargar tu libro devocional <b>El Fruto del Espíritu.</b></p>
          <a style="background-color: #078B8F; color: #fff; padding: 4px 12px; text-decoration: none; border-radius: 4px;"
          href="https://frutodelespiritu.com/descargas/frutodelespiritu.pdf">Descargar libro</a>
          <p>Visita nuestra página <a href="https://frutodelespiritu.com">Fruto del Espíritu</a> y continúa leyendo palabra
          que edifica, levanta y restaura.</p>
        </section>
    
        <section style="margin-top: 4rem">
          <div style="width: 100%;">
            <img width=100 height="auto" src="https://frutodelespiritu.com/logo.png" />
          </div>
          <p><strong>Cordialmente,</strong></p>
          <p style="margin: 0;">Reynaldo Navedo</p>
          <p style="margin: 0;">Fundador Fruto del Espíritu</p>
        </section>
      </div>`

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fruto del Espíritu" <reynaldo@frutodelespiritu.com>', // sender address
      to: `${correo}`, // list of receivers
      subject: "Libro Fruto del Espíritu ✔", // Subject line
      text: "Tu regalo ha llegdo, disfruta del contenido de este libro.", // plain text body
      html: `${output}`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.status(200).send("Añadido correctamente")

  } catch (error) {
    console.error(error)
    res.status(500).send(error)
  }

}