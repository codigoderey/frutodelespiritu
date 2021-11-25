import formidable from "formidable"
import Lectura from "../../models/lecturaModel"
import connectDB from "../../utils/connectDB"

connectDB()

export default (req, res) => {


  const form = new formidable({ keepExtensions: true })
  form.uploadDir = process.env.NODE_ENV === "development" ? "public" : process.env.NODE_ENV === "pruduction" ? "/" : "/"

  form.parse(req, async (err, fields, files) => {

    if (err) {
      console.log(err)
    }

    const filePath = files.image.path
    const fileName = filePath.substring(7, 51)

    const encontrarLectura = await Lectura.find({ imgUrl: files.image.name })

    const lectura = encontrarLectura[0]
    lectura.imgUrl = fileName

    lectura.save()

    res.json(fields, files)
  })
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  }
}