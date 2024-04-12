//Aquí va el doten, cors, y express
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const { mongoose } = require("mongoose")
const { conectarDB } = require("../config/db")
const usuarioRoutes = require("./routes/usuarioRoutes")
const atributosRoutes = require("./routes/atributosRoutes")
const parametrosRoutes  = require('./routes/parametrosRoutes')

const app = express()

app.use(express.json())
//Establecer los configuraciones de interacciones con el backend
app.use(
  cors({
    origin: "*", //Esta es la dirección del frontEnd
    methods: ["GET", "POST", "PUT", "DELETE"], //Aquí se establecen los métodos HTTP que se permitirán
    allowedHeaders: ["content-type", "Authorization"], //Encabezados permitidos
  })
)

dotenv.config()

conectarDB()
//Crear el routing
app.use("/api/usuarios", usuarioRoutes)
app.use("/api/atributos", atributosRoutes)
app.use("/api/parametro", parametrosRoutes)

const PORT = process.env.PORT || 3230
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
