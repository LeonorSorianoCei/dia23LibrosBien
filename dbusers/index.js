import  express  from "express";
import cors from "cors"
import { PORT, fullDomain } from "./config/config.js";

const app = express();
console.clear();

// Middlewares
app.use(cors());
app.use(express.json()); // leer datos json de req.body
app.use(express.urlencoded({extended:false})); // para leer datos en vez de en json en url encodeada (con código) de req.body


// importar métodos de Sequalize
import { Sequelize, DataTypes } from "sequelize";

//Crear una instancia de Sequalize
const sequalize = new Sequelize({
    dialect: "sqlite",
    storage: "./db/datos.sqlite"
})

// Definir un modelo de la tabla
const Users = sequalize.define("usuarios", {
    email: DataTypes.STRING, // Puede usarse también DATE, INTEGER, NUMBER, BOOLEAN...
    password: DataTypes.STRING,
    edad: DataTypes.INTEGER
})

// Sincronizar mis modelos con mi base de datos
// (Crear tablas en caso de que no existan)
sequalize.sync({alter: true})

app.get ("/", (req, res) => {
    res.setHeader("Content-type", "text/html")
    res.send("<h1>HOLA</h1>")
})


app.get("/users", async (req, res) => {
    const users = await Users.findAll()
    res.json(users)
})

app.post("/users", async (req, res) => {
    const user = await Users.create(req.body)
    res.json(user)
})


app.put("/users/:id", async (req, res) => {
    const user = await Users.findByPk(req.params.id)
    if(user){
        await user.update(req.body)
        res.json(user)
    }else {
        res.status(404).json({msg: "usuario no encontrado"})
    }
})

app.delete("/users/:id", async (req, res) => {
    const user = await Users.findByPk(req.params.id)
    
    if(user){
        await user.destroy(req.body)
        res.json({msg: "usuario eliminado correctamente"})
    }else {
        res.status(404).json({msg: "usuario no encontrado"})
    }
})




app.listen(PORT, () => {
    console.log(`Servidor corriendo en: ${fullDomain}`)
})