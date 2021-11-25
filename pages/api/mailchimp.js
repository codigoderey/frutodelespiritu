import client from "@mailchimp/mailchimp_marketing"
import nodemailer from "nodemailer"

client.setConfig({
  apiKey: process.env.MAILCHIMP,
  server: "us10"
})

export default (req, res) => {

  const run = async () => {

    const { nombre, correo } = req.body

    try {

      await client.lists.addListMember("377c460b69", {
        email_address: correo,
        // status: "pending",
        // status: "transactional",
        status: "subscribed",
        merge_fields: { NOMBRE: nombre }
      })

      // create reusable transporter object using the default SMTP transport
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

      res.status(200).send("Añadido correctamente")

    } catch (error) {
      console.error(error)
      res.status(500).send(error)
    }

  }

  run()

}