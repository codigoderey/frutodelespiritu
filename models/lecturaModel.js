import mongoose from 'mongoose';

const { String, ObjectId } = mongoose.Schema.Types;

const LecturaSchema = new mongoose.Schema(
  {
    // reference users

    titulo: {
      type: String,
      required: true,
    },

    publicadoPor: {
      type: ObjectId,
      ref: 'Usuario',
    },

    slug: {
      type: String,
      unique: true,
    },

    resumen: {
      type: String,
      required: true,
    },

    contenido: {
      type: String,
      required: true,
    },

    archivado: {
      type: Boolean,
      default: false,
      required: true,
    },

    categoria: {
      type: String,
      default: "General",
      required: true
    },

    comentarios: [
      {
        usuario: {
          type: ObjectId,
          ref: 'Usuario',
        },
        texto: {
          type: String,
        },
        fecha: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Lectura || mongoose.model('Lectura', LecturaSchema);
