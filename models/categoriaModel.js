import mongoose from "mongoose"

const { String } = mongoose.Schema.Types

const CategoriaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true
    },
  },
  { timestamps: true }
)

export default mongoose.models.Categoria || mongoose.model("Categoria", CategoriaSchema)