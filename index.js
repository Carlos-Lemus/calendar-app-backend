const express = require("express");
require("dotenv").config();
const { dbConnection } = require("./database/config");
const cors = require("cors");

// Crea el ser servidor express
const app = express();

dbConnection();

app.use(cors());

// Directorio publico
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

// Rutas
// Auth
app.use("/api/auth", require("./router/auth"));
// Events
app.use("/api/events", require("./router/events"));

// Escucha las peticiones
app.listen(process.env.PORT, () => {
    console.log(`El servidor utiliza el puerto ${process.env.PORT}`);
});