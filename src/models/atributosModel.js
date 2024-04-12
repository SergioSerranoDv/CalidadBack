const mongoose = require("mongoose")

const atributoSchema = mongoose.Schema(
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
      required: true,
      trim: true,
    },
    observation: {
      type: String,
      required: false,
      trim: true,
    },
    totalPoints: {
      type: Number,
      required: true,
      trim: true,
    },
    percentage: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

const atributo = mongoose.model("atributo", atributoSchema)
module.exports = atributo
