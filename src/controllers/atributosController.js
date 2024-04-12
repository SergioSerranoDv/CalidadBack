const atributo = require("../models/atributosModel.js")

const registrar = async (req, res) => {
  try {
    console.log("Inicio del registro de formulario...")
    const { item, description, valor, observation, totalPoints, percentage } = req.body

    console.log("Datos recibidos:", req.body)

    const nuevoatributo = new atributo({
      item,
      description,
      valor,
      observation,
      totalPoints,
      percentage,
    })

    console.log("Objeto atributo creado:", nuevoatributo)

    const atributoAlmacenado = await nuevoatributo.save()

    console.log("Atributo almacenada en la base de datos:", atributoAlmacenado)

    res.json(atributoAlmacenado)
  } catch (error) {
    console.error("Error durante el registro:", error)
    res.status(500).json({ error: "Hubo un problema al intentar registrar el formulario" })
  }
}

module.exports = {
  registrar,
}
