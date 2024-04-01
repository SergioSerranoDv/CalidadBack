const mongoose = require("mongoose")

const fiabilidadWangoSchema = mongoose.Schema(
  {
    v1: {
      type: Number,
      required: true,
      trim: true,
    },
    o1: {
      type: String,
      required: false,
      trim: true,
    },
    v2: {
      type: Number,
      required: true,
      trim: true,
    },
    o2: {
      type: String,
      required: false,
      trim: true,
    },
    v3: {
      type: Number,
      required: true,
      trim: true,
    },
    o3: {
      type: String,
      required: false,
      trim: true,
    },
    v4: {
      type: Number,
      required: true,
      trim: true,
    },
    o4: {
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

const fiabilidadWango = mongoose.model("Fiabilidad", fiabilidadWangoSchema)
module.exports = fiabilidadWango
