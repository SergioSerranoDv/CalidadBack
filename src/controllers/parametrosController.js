const parametros = require("../models/parametrosModel");

const registrar = async (req, res) => {
  try {
    console.log("Inicio del registro de formulario...");
    const { item, description, preguntas, total } = req.body;

    console.log("Datos recibidos:", req.body);

    const nuevoParametro = new parametros({
      item,
      description,
      preguntas,
      total,
    });

    console.log("Objeto de parámetro creado:", nuevoParametro);

    const parametroAlmacenado = await nuevoParametro.save();

    console.log("Parámetro almacenado en la base de datos:", parametroAlmacenado);

    res.json(parametroAlmacenado);
  } catch (error) {
    console.error("Error durante el registro:", error);
    res.status(500).json({ error: "Hubo un problema al intentar registrar el formulario", details: error.message });
  }
};

const eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const parametroEliminado = await parametros.findByIdAndDelete(id); // Corregido aquí
    if (!parametroEliminado) {
      return res.status(404).json({ error: "El parámetro no fue encontrado" });
    }
    res.json({ message: "El parámetro fue eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el parámetro:", error);
    res.status(500).json({ error: "Hubo un problema al eliminar el parámetro" });
  }
};

const editar = async (req, res) => {
  try {
    const { id } = req.params;
    const { item, description, preguntas, total } = req.body;

    // Buscar el parámetro por su ID y actualizar sus campos
    const parametroActualizado = await parametros.findByIdAndUpdate(
      id,
      { item, description, preguntas, total },
      { new: true }
    );

    if (!parametroActualizado) {
      return res.status(404).json({ error: "El parámetro no fue encontrado" });
    }

    res.json(parametroActualizado);
  } catch (error) {
    console.error("Error al actualizar el parámetro:", error);
    res.status(500).json({ error: "Hubo un problema al actualizar el parámetro" });
  }
};

module.exports = {
  registrar,
  eliminar,
  editar,
};
