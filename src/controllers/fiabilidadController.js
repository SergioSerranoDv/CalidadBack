const fiabilidadWango = require("../models/fiabilidadModel.js")

const registrar = async (req, res) => {
  try {
    console.log("Inicio del registro de formulario...")
    const { v1, v2, v3, v4, o1, o2, o3, o4, totalPoints, percentage } = req.body

    console.log("Datos recibidos:", req.body)

    const nuevofiabilidad = new fiabilidadWango({
      v1,
      v2,
      v3,
      v4,
      o1,
      o2,
      o3,
      o4,
      totalPoints,
      percentage,
    })

    console.log("Objeto de fiabilidad creado:", nuevofiabilidad)

    const fiabilidadAlmacenado = await nuevofiabilidad.save()

    console.log("Fiabilidad almacenada en la base de datos:", fiabilidadAlmacenado)

    res.json(fiabilidadAlmacenado)
  } catch (error) {
    console.error("Error durante el registro:", error)
    res.status(500).json({ error: "Hubo un problema al intentar registrar el formulario" })
  }
}

module.exports = {
  registrar,
}
