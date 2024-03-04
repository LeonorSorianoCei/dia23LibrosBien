import { Libros } from "../index.js"

export const getAllBooks =async (req, res) => {
    const libros = await Libros.findAll()
    res.json(libros)
}

export const createBook = async (req, res) => {
    const libro = await Libros.create(req.body)
    res.json(libro)
}


export const updateBook =async (req, res) => {
    const libro = await Libros.findByPk(req.params.id)
    if(libro){
        await libro.update(req.body)
        res.json(libro)
    }else {
        res.status(404).json({msg: "libro no encontrado"})
    }
}


export const deleteBook =async (req, res) => {
    const libro = await Libros.findByPk(req.params.id)
    
    if(libro){
        await libro.destroy(req.body)
        res.json({msg: "libro eliminado correctamente"})
    }else {
        res.status(404).json({msg: "libro no encontrado"})
    }
}



