const eficienciaWango = require("../models/eficienciaModel.js")

const registrar = async (req, res) => {
  try {
    console.log("Inicio del registro de formulario...")
    const { v1, v2, v3, v4, v5, o1, o2, o3, totalPoints, percentage } = req.body

    console.log("Datos recibidos:", req.body)

    const nuevoeficiencia = new eficienciaWango({
      v1,
      v2,
      v3,
      v4,
      v5,
      o1,
      o2,
      o3,
      totalPoints,
      percentage,
    })

    console.log("Objeto de eficiencia creado:", nuevoeficiencia)

    const eficienciaAlmacenado = await nuevoeficiencia.save()

    console.log("eficiencia almacenada en la base de datos:", eficienciaAlmacenado)

    res.json(eficienciaAlmacenado)
  } catch (error) {
    console.error("Error durante el registro:", error)
    res.status(500).json({ error: "Hubo un problema al intentar registrar el formulario" })
  }
}

module.exports = {
  registrar,
}
