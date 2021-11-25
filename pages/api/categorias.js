import Categoria from "../../models/categoriaModel";
import connectDB from "../../utils/connectDB"

connectDB()

export default (req, res) => {
  switch (req.method) {
    case "GET":
      handleGetRequest(req, res)
      break;

    case "POST":
      handlePostRequest(req, res)
      break;

    case "PUT":
      handlePutRequest(req, res)
      break;

    case "DELETE":
      handleDeleteRequest(req, res)
      break;

    default:
      res.status(502).send(`El método ${req.method} no está permitido.`)
  }
}

const handlePostRequest = async (req, res) => {

  try {
    const { nuevaCategoria } = req.body

    const categoria = await new Categoria({ nombre: nuevaCategoria })

    await categoria.save()
    res.status(200).send(nuevaCategoria)
  } catch (error) {
    console.error(error)
    res.status(404).send("Esa categoría está registrada.")
  }
}

const handleGetRequest = async (req, res) => {
  try {
    const categorias = await Categoria.find()
    res.status(200).send(categorias)
  } catch (error) {
    res.status(400).send("Hubo un error, intente nuevamente.")
  }
}

const handleDeleteRequest = async (req, res) => {
  try {
    const { id } = req.body
    const categoria = await Categoria.findOneAndDelete({ _id: id })
    console.log(categoria)
    res.status(200).send("Categoria eliminada")
  } catch (error) {
    res.status(400).send("Hubo un error, intente nuevamente.")
  }
}

const handlePutRequest = async (req, res) => {
  try {
    const { id, categoriaParaEditar } = req.body
    console.log(categoriaParaEditar)
    await Categoria.findOneAndUpdate({ _id: id }, { nombre: categoriaParaEditar }, { new: true })

    res.status(200).send("Categoria eliminada")
  } catch (error) {
    res.status(400).send("Hubo un error, intente nuevamente.")
  }
}