import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom" // redirige a donde queramos
import { easyFetch } from "../helpers/utils"

const BookForm = ({libro, setEditarLibro}) => {

    const [formData, setFormData] = useState(libro)
    const {titulo, autor, categoria, id} = formData
    const navigate = useNavigate()

    const handleCreateBook = async () => {
        easyFetch({
            url: "http://localhost:3000/API/v1/libros/",
            method: "POST",
            body: formData,

            callback: (data) => {
                console.log("ÉXITOOO CREADO - Cree con éxito", data)

                // imre a la página de listaLibros
                navigate("/lista")
            }
        })
    }

    const handleRemoveBook = async () => {
        easyFetch({
            url: "http://localhost:3000/API/v1/libros/" + id,
            method: "DELETE",

            callback: (data) => {
                console.log("ÉXITOOO ELIMINADO- Eliminé con éxito", data)

                setEditarLibro(null)
            }
        })
    }

    const handleUpdateBook = async () => {
        easyFetch({ //nuestro fetch personalizado de utils.js
            url: "http://localhost:3000/API/v1/libros/" + id,
            method: "PUT",
            body: formData,

            callback: (data) => {
                console.log("ÉXITOOO ACTUALIZADO - Devolví con éxito", data)

                setEditarLibro(null)
            }
        })
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target // obtengo del input el nombre y el valor
        setFormData({...formData, [name]:value}) // actualizo mi formData con el nuevo valor conservando los valores anteriores
    }

    return (
        <>

        <form className="main-form">
            <label htmlFor="">Nombre del libro</label>
            <input 
                type="text" 
                className="input-control"
                name="titulo"
                value={titulo}
                placeholder="Ingrese título del libro"
                onChange={handleInputChange}
                />
                <br />

            <label htmlFor="">Autor del libro</label>
                <input 
                    type="text" 
                    className="input-control"
                    name="autor"
                    value={autor}
                    placeholder="Ingrese nombre del autor"
                    onChange={handleInputChange}
                />
                <br />

            <label htmlFor="">Categoría</label>
                <input 
                    type="text" 
                    className="input-control"
                    name="categoria"
                    value={categoria}
                    placeholder="Ingrese la categoría del libro"
                    onChange={handleInputChange}
                />

        </form>

        {
            // editando o creando (id=0)
            id ? (
                <>
                <button onClick={handleUpdateBook}>Guardar</button>
                <button onClick={handleRemoveBook}>Eliminar</button>
                </>

            ) : (
                <button onClick={handleCreateBook}>Crear Nuevo</button>
            )
        }
        
        </>

    )
}

export default BookForm


