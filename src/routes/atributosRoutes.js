const express = require("express");
const router = express.Router();
const Parametros = require("../models/parametrosModel");
const { registrar } = require("../controllers/parametrosController");

// Middleware CORS
router.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Endpoint para obtener los datos de parámetro
router.get("/", async (req, res) => {
  try {
    const parametros = await Parametros.find();
    res.json(parametros);
  } catch (error) {
    console.error("Error al obtener los datos de parámetro:", error);
    res.status(500).json({ error: "Hubo un problema al obtener los datos de parámetro" });
  }
});



router.post("/", registrar);

module.exports = router;
