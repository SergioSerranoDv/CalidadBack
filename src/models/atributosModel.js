const mongoose = require("mongoose")

const atributosSchema = mongoose.Schema(
  {
    item: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    valor: {
      type: Number,
      required: false,
      trim: true,
    },
    observation: {
      type: String,
      required: false,
      trim: true,
    },
    parametro: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "parametros",
    },
  },
  {
    timestamps: true,
  }
)

const atributos = mongoose.model("Atributo", atributosSchema)
module.exports = atributos
