const mongoose = require("mongoose")

const parametrosSchema = mongoose.Schema(
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
      trim: true,
    },
    percentage: {
      type: Number,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const parametros = mongoose.model("Parametro", parametrosSchema)
module.exports = parametros
