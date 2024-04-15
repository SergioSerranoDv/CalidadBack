const express = require("express")
const router = express.Router()
const Atributos = require("../models/atributosModel")
const { registrar, eliminar, editar } = require("../controllers/atributosController")

router.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

router.get("/", async (req, res) => {
  try {
    const atributos = await Atributos.find({ parametro: req.query.parametro });
    if (!atributos || atributos.length === 0) {
      console.error("No se encontraron atributos para el parámetro proporcionado");
      return res.status(404).json({ error: "No se encontraron atributos para el parámetro proporcionado" });
    }
    res.json(atributos);
  } catch (error) {
    console.error("Error al obtener los datos de atributo:", error);
    res.status(500).json({ error: "Hubo un problema al obtener los datos de atributo" });
  }
});



router.get("/:id", async (req, res) => {
  try {
    const atributo = await Atributos.findById(req.params.id);
    if (!atributo) {
      return res.status(404).json({ error: "Atributo no encontrado" });
    }
    res.json(atributo);
  } catch (error) {
    console.error("Error al obtener el atributo por ID:", error);
    res.status(500).json({ error: "Hubo un problema al obtener el atributo por ID" });
  }
});

router.post("/", registrar)
router.delete("/:id", eliminar)
router.put("/:id", editar)

module.exports = router
