const express = require("express")
const router = express.Router()
const checkAuth = require("../../middleware/checkAuth")
const {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
  obtenerPerfil,
  updateParameters,
} = require("../controllers/usuarioController")
router.post("/", registrar)
router.post("/login", autenticar)
router.get("/confirmar/:token", confirmar)
router.post("/olvide-password", olvidePassword)
router.get("/olvide-password/:token", comprobarToken)
router.post("/olvide-password/:token", nuevoPassword)
router.get("/perfil", checkAuth, perfil)
router.get("/perfil/:id", obtenerPerfil)
router.put("/upate/parameters", checkAuth, updateParameters)
module.exports = router
