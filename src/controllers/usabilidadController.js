const usabilidadWango = require("../models/usabilidadModel.js")

const registrar = async (req, res) => {
  try {
    console.log("Inicio del registro de formulario...")
    const { v1, v2, v3, v4, v5, o1, o2, o3, o4, o5, totalPoints, percentage } = req.body

    console.log("Datos recibidos:", req.body)

    const nuevousabilidad = new usabilidadWango({
      v1,
      v2,
      v3,
      v4,
      v5,
      o1,
      o2,
      o3,
      o4,
      o5,
      totalPoints,
      percentage,
    })

    console.log("Objeto de usabilidad creado:", nuevousabilidad)

    const usabilidadAlmacenado = await nuevousabilidad.save()

    console.log("usabilidad almacenada en la base de datos:", usabilidadAlmacenado)

    res.json(usabilidadAlmacenado)
  } catch (error) {
    console.error("Error durante el registro:", error)
    res.status(500).json({ error: "Hubo un problema al intentar registrar el formulario" })
  }
}

module.exports = {
  registrar,
}
