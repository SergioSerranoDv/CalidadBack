const atributos = require("../models/atributosModel");

const registrar = async (req, res) => {
  try {
    console.log("Inicio del registro de formulario...");
    const { item, description, valor, observation, idParametro } = req.body;

    console.log("Datos recibidos:", req.body);

    const nuevoAtributo = new atributos({
      item,
      description,
      valor,
      observation,
      parametro: idParametro // Asegúrate de que idParametro sea un ObjectId válido
    });

    console.log("Objeto de atributo creado:", nuevoAtributo);

    const atributoAlmacenado = await nuevoAtributo.save();

    console.log("Atributo almacenado en la base de datos:", atributoAlmacenado);

    res.json(atributoAlmacenado);
  } catch (error) {
    console.error("Error durante el registro:", error);
    res.status(500).json({ error: "Hubo un problema al intentar registrar el formulario", details: error.message });
  }
};

const eliminar = async (req, res) => {
  try {
    const { id } = req.params;
    const atributoEliminado = await atributos.findByIdAndDelete(id); // Corregido aquí
    if (!atributoEliminado) {
      return res.status(404).json({ error: "El atributo no fue encontrado" });
    }
    res.json({ message: "El atributo fue eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el atributo:", error);
    res.status(500).json({ error: "Hubo un problema al eliminar el atributo" });
  }
};

const editar = async (req, res) => {
  try {
    const { id } = req.params;
    const { item, description, valor, observation } = req.body;

    // Buscar el atributo por su ID y actualizar sus campos
    const atributoActualizado = await atributos.findByIdAndUpdate(
      id,
      { item, description, valor, observation },
      { new: true }
    );

    if (!atributoActualizado) {
      return res.status(404).json({ error: "El atributo no fue encontrado" });
    }

    res.json(atributoActualizado);
  } catch (error) {
    console.error("Error al actualizar el atributo:", error);
    res.status(500).json({ error: "Hubo un problema al actualizar el atributo" });
  }
};

module.exports = {
  registrar,
  eliminar,
  editar,
};
