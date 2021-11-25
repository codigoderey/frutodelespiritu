import Lectura from "../../models/lecturaModel"
import Usuario from '../../models/userModel'
import connectDB from "../../utils/connectDB"
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
      handlePostRequest(req, res);
      break

    case "PUT":
      handlePutRequest(req, res)
      break

    case "DELETE":
      handleDeleteRequest(req, res)
      break;

    default:
      res
        .status(500)
        .send(`Hubo un error con el método ${req.method}`)
  }
}

const handlePostRequest = async (req, res) => {

  // Run the middleware
  await runMiddleware(req, res, cors);

  try {
    const { titulo, publicadoPor, slug, resumen, contenido, categoria } = req.body
    console.log(categoria)
    const nuevaLectura = await new Lectura({
      titulo,
      publicadoPor,
      slug,
      resumen,
      contenido,
      categoria
    }).save()

    console.log(nuevaLectura)
    res.status(200).json(nuevaLectura)

  } catch (error) {
    console.error(error)
    res.status(500).send("Hubo un error, intenta nuevamente")
  }
}

const handleGetRequest = async (req, res) => {

  // Run the middleware
  await runMiddleware(req, res, cors);

  const { slug } = req.query

  try {
    if (slug) {
      const lectura = await Lectura.findOne({ slug }).populate({
        path: "publicadoPor",
        model: Usuario
      })
      return res.status(200).json(lectura)

    } else {
      const lecturas = await Lectura.find().populate({
        path: "publicadoPor",
        model: Usuario
      })
      return res.status(200).json(lecturas)
    }

  } catch (error) {
    console.error(error)
    res.status(500).send("Lo sentimos, hubo un error, intenta nuevamente.")
  }
}

const handlePutRequest = async (req, res) => {

  // Run the middleware
  await runMiddleware(req, res, cors);

  try {

    const { slug, action } = req.body
    console.log(req.body)

    if (action === "editarLectura") {

      const lectura = await Lectura.findOneAndUpdate({ slug }, req.body, {
        new: true
      })

      await lectura.save()

      res.status(200).send("Editada")
    }


  } catch (error) {
    console.error(error)
    res.status(500).send("Hubo un error, inténtelo nuevamente.")
  }

}

const handleDeleteRequest = async (req, res) => {

  // Run the middleware
  await runMiddleware(req, res, cors);

  try {

    const { id } = req.body
    const lectura = await Lectura.findOne({ _id: id })

    await Usuario.find()
      .populate({
        path: 'lecturasGuardadas',
        model: Lectura,
      })
      // this will select all instances of the lectura that were saved
      .updateMany(
        {},
        { $pull: { lecturasGuardadas: { lectura: lectura._id } } },
        { multi: true }
      );

    lectura.archivado = true;
    await lectura.save();

    // this will delete all instances of lecturas 
    await Lectura.deleteMany({ archivado: true });

    res.status(200).send('Publicación eliminada correctamente');

  } catch (error) {
    console.error(error)
    res.status(500).send("Hubo un error, inténtelo nuevamente")
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};

// handle delete request, translate from liderazgo completo
// Run de middleware
// await runMiddleware(req, res, cors);

// const { postId } = req.body.params;

// if (!('Authorization' in req.body.headers)) {
//   return res.status(401).send('No estás autorizado');
// }
// try {
//   const lectura = await Lectura.findById({ _id: postId });

//   await Usuario.find()
//     .populate({
//       path: 'lecturasGuardadas',
//       model: Post,
//     })
    // this will select all instances of the lectura that were saved
//     .updateMany(
//       {},
//       { $pull: { lecturasGuardadas: { lectura: lectura._id } } },
//       { multi: true }
//     );

//   lectura.archive = true;
//   await lectura.save();
//   // this will delete all instances of lecturas 
//   await Lectura.deleteMany({ archive: true });

//   res.status(200).send('Publicación eliminada correctamente');
// } catch (error) {
//   console.error(error);
//   res.send(error);
// }