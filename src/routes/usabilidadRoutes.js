const express = require("express")
const router = express.Router()
const UsabilidadWango = require("../models/usabilidadModel")
const { registrar } = require("../controllers/usabilidadController")

// Middleware CORS
router.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

// Endpoint para obtener los datos de usabilidad
router.get("/", async (req, res) => {
  try {
    const usabilidades = await UsabilidadWango.find()
    res.json(usabilidades)
  } catch (error) {
    console.error("Error al obtener los datos de usabilidad:", error)
    res.status(500).json({ error: "Hubo un problema al obtener los datos de usabilidad" })
  }
})

router.post("/", registrar)
module.exports = router
