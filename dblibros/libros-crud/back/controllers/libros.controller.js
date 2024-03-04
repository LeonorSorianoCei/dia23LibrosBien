import misDatos from "../db/datos.js"
import { Libros } from "../index.js"

const listaLibros = misDatos.libros



// formato de respuesta
const responseAPI = {
    data: listaLibros,
    msg: "",
    status: "ok"
}


export const getAllLibros = async (req, res) => {
    const libros = await Libros.findAll()
    responseAPI.data=libros
    responseAPI.msg="Obtener Libros"
    responseAPI.status="ok"
    res.status(200).send(responseAPI)
}


export const createLibro = async (req, res) => {

    delete req.body.id
    const libro = await Libros.create(req.body)
    
    responseAPI.data=libro
    responseAPI.msg="Crear nuevo libro"
    responseAPI.status="ok"
    res.status(200).send(responseAPI)
}


export const getLibroById = async (req, res) => {
    const user = await Libros.findByPk(req.params.id)
    res.json(user)
}


export const updateLibro = async (req, res) => {

    const libro = await Libros.findByPk(req.params.id) // paso 1 busco libro en la base de datos
    if(libro){
        await libro.update(req.body) // paso 2 actualizar el libro con los nuevos datos
        responseAPI.data=libro
        responseAPI.msg="Actualizar libro"
        responseAPI.status="ok"
        res.status(200).send(responseAPI)
    }else {
        res.status(404).json({msg: "libro no encontrado"})
    }
}


export const deleteLibro = async (req, res) => {

    const libro = await Libros.findByPk(req.params.id)
    if(libro){
        responseAPI.data=libro;
        await libro.destroy(req.body)
        responseAPI.msg="Libro eliminado"
        res.status(200).send(responseAPI)
    }else {
        res.status(404).json({msg: "usuario no encontrado"})
    }

}