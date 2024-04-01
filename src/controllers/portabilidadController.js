const portabilidadWango = require("../models/portabilidadModel.js")

const registrar = async (req, res) => {
  try {
    console.log("Inicio del registro de formulario...")
    const { v1, v2, v3, v4, v5, o1, o2, o3, o4, o5, totalPoints, percentage } = req.body

    console.log("Datos recibidos:", req.body)

    const nuevoportabilidad = new portabilidadWango({
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

    console.log("Objeto de portabilidad creado:", nuevoportabilidad)

    const portabilidadAlmacenado = await nuevoportabilidad.save()

    console.log("portabilidad almacenada en la base de datos:", portabilidadAlmacenado)

    res.json(portabilidadAlmacenado)
  } catch (error) {
    console.error("Error durante el registro:", error)
    res.status(500).json({ error: "Hubo un problema al intentar registrar el formulario" })
  }
}

module.exports = {
  registrar,
}
