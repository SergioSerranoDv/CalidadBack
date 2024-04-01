//Aquí va el doten, cors, y express
const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const { mongoose } = require("mongoose")
const { conectarDB } = require("../config/db")
const usuarioRoutes = require("./routes/usuarioRoutes")
const funcionalidadRoutes = require("./routes/funcionalidadRoutes")
const fiabilidadRoutes = require("./routes/fiabilidadRoutes")
const usabilidadRoutes = require("./routes/usabilidadRoutes")
const eficienciaRoutes = require("./routes/eficienciaRoutes")
const capacidadRoutes = require("./routes/capacidadRoutes")
const portabilidadRoutes = require("./routes/portabilidadRoutes")
const calidadRoutes = require("./routes/calidadRoutes")

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
app.use("/api/funcionalidad", funcionalidadRoutes)
app.use("/api/fiabilidad", fiabilidadRoutes)
app.use("/api/usabilidad", usabilidadRoutes)
app.use("/api/eficiencia", eficienciaRoutes)
app.use("/api/capacidad", capacidadRoutes)
app.use("/api/portabilidad", portabilidadRoutes)
app.use("/api/calidad", calidadRoutes)

const PORT = process.env.PORT || 3230
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
