const capacidadWango = require("../models/capacidadModel.js")

const registrar = async (req, res) => {
  try {
    console.log("Inicio del registro de formulario...")
    const { v1, v2, v3, v4, v5, o1, o2, o3, o4, o5, totalPoints, percentage } = req.body

    console.log("Datos recibidos:", req.body)

    const nuevocapacidad = new capacidadWango({
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

    console.log("Objeto de capacidad creado:", nuevocapacidad)

    const capacidadAlmacenado = await nuevocapacidad.save()

    console.log("capacidad almacenada en la base de datos:", capacidadAlmacenado)

    res.json(capacidadAlmacenado)
  } catch (error) {
    console.error("Error durante el registro:", error)
    res.status(500).json({ error: "Hubo un problema al intentar registrar el formulario" })
  }
}

module.exports = {
  registrar,
}
