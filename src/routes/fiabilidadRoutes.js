const express = require("express")
const router = express.Router()
const FiabilidadWango = require("../models/fiabilidadModel")
const { registrar } = require("../controllers/fiabilidadController")

// Middleware CORS
router.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// Endpoint para obtener los datos de fiabilidad
router.get("/", async (req, res) => {
  try {
    const fiabilidades = await FiabilidadWango.find()
    res.json(fiabilidades)
  } catch (error) {
    console.error("Error al obtener los datos de fiabilidad:", error)
    res.status(500).json({ error: "Hubo un problema al obtener los datos de fiabilidad" })
  }
})

router.post("/", registrar)
module.exports = router
