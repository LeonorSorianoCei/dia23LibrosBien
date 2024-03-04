import express from "express";
import {PORT, domain, fullDomain} from "./config/config.js"
import { logger } from "./middlewares/logger.js";
import { setHeaders } from "./middlewares/setHeaders.js";
import indexRoutes from "./routes/index.routes.js";
import cors from 'cors'
import { Sequelize, DataTypes } from "sequelize";

const app = express()

console.clear();


// USO DE MIDDLEWARES
app.use(cors())             // Cors se usa para evitar el acceso de fuentes externas, son los permisos que le damos a los dominios externos para poder acceder o no a nuestros datos
app.use(setHeaders)         // setea los headers a application json, lo que mando se procesa como json
app.use(express.json());    // procesa el json body para leerlo con req.body, lo que recibe (request) lo proceso como json
app.use(logger)   
app.use(express.urlencoded({extended:false}))          // indica la url en la que nos encontramos y a parte imprimimons una fecha

const sequalize = new Sequelize({
    dialect: "sqlite",
    storage: "./db/datos.sqlite"
})

export const Libros = sequalize.define("libros", {
    titulo: DataTypes.STRING, // Puede usarse también DATE, INTEGER, NUMBER, BOOLEAN...
    autor: DataTypes.STRING,
    categoria: DataTypes.STRING
})


sequalize.sync({alter: true})




// RUTAS
app.get("/", (req, res) => {
    res.setHeader("Content-type", "text/html"); // devolvemos un html

    const landingHTML = `
    <h1>Bienvenidos a nuestra API de Libros</h1>
    `
    res.send(landingHTML);
})


app.use("/API/v1/", indexRoutes) 




// ALTA DEL SERVIDOR
app.listen(PORT, () => {
    console.log(`Server running on ${fullDomain}`)
})