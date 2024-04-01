const calidadWango = require("../models/calidadModel.js")

const registrar = async (req, res) => {
  try {
    console.log("Inicio del registro de formulario...")
    const { v1, v2, v3, v4, v5, v6, o1, o2, o3, o4, o5, o6, totalPoints, percentage } = req.body

    console.log("Datos recibidos:", req.body)

    const nuevocalidad = new calidadWango({
      v1,
      v2,
      v3,
      v4,
      v5,
      v6,
      o1,
      o2,
      o3,
      o4,
      o5,
      o6,
      totalPoints,
      percentage,
    })

    console.log("Objeto de calidad creado:", nuevocalidad)

    const calidadAlmacenado = await nuevocalidad.save()

    console.log("calidad almacenada en la base de datos:", calidadAlmacenado)

    res.json(calidadAlmacenado)
  } catch (error) {
    console.error("Error durante el registro:", error)
    res.status(500).json({ error: "Hubo un problema al intentar registrar el formulario" })
  }
}

module.exports = {
  registrar,
}
