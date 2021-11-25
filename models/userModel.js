import mongoose from "mongoose"

const { String, Date, ObjectId } = mongoose.Schema.Types

const UsuarioSchema = new mongoose.Schema({

  nombre: {
    type: String,
    required: true,
    unique: false
  },

  correo: {
    type: String,
    required: true,
    unique: true
  },

  contrasena: {
    type: String,
    required: true,
    select: false,
  },

  bio: {
    type: String,
    required: false,
  },

  imgUrl: {
    type: String,
    required: false
  },

  lecturasGuardadas: [
    {
      publicadoPor: {
        type: ObjectId,
        ref: "Usuario",
      },
      lectura: {
        type: ObjectId,
        unique: true,
        ref: "Lectura",
        sparse: true
      }
    }
  ],

  archivado: {
    type: Boolean,
    default: false,
    required: true,
  },

  permisos: {
    type: String,
    required: true,
    default: "regular",
    enum: ["regular", "admin", "root"]
  },

  token: String,

  expira: Date,

}, {
  timestamps: true
})

export default mongoose.models.Usuario || mongoose.model("Usuario", UsuarioSchema)