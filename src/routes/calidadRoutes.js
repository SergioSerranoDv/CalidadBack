const express = require("express")
const router = express.Router()
const CalidadWango = require("../models/calidadModel")
const { registrar } = require("../controllers/calidadController")

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
    const calidades = await CalidadWango.find()
    res.json(calidades)
  } catch (error) {
    console.error("Error al obtener los datos de usabilidad:", error)
    res.status(500).json({ error: "Hubo un problema al obtener los datos de usabilidad" })
  }
})

router.post("/", registrar)
module.exports = router
