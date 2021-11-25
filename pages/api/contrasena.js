import Usuario from "../../models/userModel"
import connectDB from "../../utils/connectDB"
import crypto from "crypto"
import { recuperarContrasena } from "../../utils/emails/recuperarContrasena"
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import bcrypt from 'bcryptjs';
import Cors from "cors"

connectDB()

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default (req, res) => {

  switch (req.method) {

    case "GET":
      handleGetRequest(req, res);
      break;

    case "POST":
      handlePostRequest(req, res)
      break;

    case "PUT":
      handlePutRequest(req, res)
      break;

    default:
      res
        .status(500)
        .send("Hubo un error, inténtalo nuevamente")
  }
}

const handleGetRequest = async (req, res) => {

  // Run the middleware
  await runMiddleware(req, res, cors);

  try {
    const { token } = req.query;
    await Usuario.findOne({
      token,
      expira: {
        $gt: Date.now(),
      },
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
  }
}

const handlePostRequest = async (req, res) => {

  // Run the middleware
  await runMiddleware(req, res, cors);

  try {

    const { correo } = req.body

    const usuario = await Usuario.findOne({ correo })

    if (!usuario) {
      return res
        .status(402).send(`El correo electrónico ${correo} no está registrado, intenta nuevamente.`)
    }

    if (correo !== usuario.correo) {
      return res.status(402).send(`El correo electrónico ${correo} no está registrado, intenta nuevamente.`)
    }

    // si el usuario existe, generar un token
    usuario.token = crypto.randomBytes(20).toString("hex")
    usuario.expira = Date.now() + 3600000

    const resetURL = `http://${req.headers.host}/actualizar-contrasena?token=${usuario.token}`

    const { nombre } = usuario
    const email = correo

    recuperarContrasena({ nombre, email, resetURL })

    await usuario.save()

    return res.status(200).send("Token enviado")

  } catch (error) {
    console.error(error)
    res.status(500).send("Hubo un error, inténtelo nuevamente")
  }
}

const handlePutRequest = async (req, res) => {

  // Run the middleware
  await runMiddleware(req, res, cors);

  try {
    const { correo, contrasena } = req.body;

    if (!isEmail(correo)) {
      return res.status(422).send('El correo electrónico no es válido');
    } else if (!isLength(contrasena, { min: 6 })) {
      return res
        .status(422)
        .send('La contraseña debe contener al menos 6 caracteres');
    }

    // if does not exist, hash password
    const passwordhash = await bcrypt.hash(contrasena, 10);

    // check if user exists in db
    const usuario = await Usuario.findOneAndUpdate(
      { correo },
      { contrasena: passwordhash }
    );

    if (!usuario) {
      return res.status(422).send(`Ese correo no está registrado, intenta nuevamente.`);
    }

    await usuario.save();

    // contrasenaActualizada({ name, email });

    return res.status(200).send('La contraseña se ha actualizado');
  } catch (error) {
    console.error(error);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};