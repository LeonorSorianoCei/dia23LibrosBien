import { useState, useEffect } from "react"
import BookForm from "./BookForm"
import { easyFetch } from "../helpers/utils"


function BookList () {
  const [bookList, setBookList] = useState([])
  const [editarLibro, setEditarLibro] = useState(null)

  useEffect(() => {
  fetchLibros()
  }, [editarLibro]) // si está vacio significa que se ejecuta una sola vez cuando inicio el componente, si pusiera bookList, cada vez que actualizara el componente se realizaría de nuevo

  const fetchLibros =  () => {
 /*   try {
      const url = "http://localhost:3000/API/v1/libros"
      const response = await fetch(url) 

      if(!response.ok){
        throw new Error("Error al obtener los libros")
      }

      const jsonData = await response.json()

      setBookList(jsonData.data)
    }

    catch (error){
      console.error("tuviste un error")
    }
    */

    easyFetch(
      {
        url: "http://localhost:3000/API/v1/libros",
        callback: (jsonData) => {
          setBookList (jsonData.data)
        }
      }
    )
  }



  const handleEditarLibro = (libro) => {
    console.log("EDITAR LIBRO CON ID: " + libro.id)
    setEditarLibro(libro)
  }
    return (
      <>
        <h2>Lista Libros</h2>

        <div className="cardList">

          {
            bookList.map( libro => (
                <div className="card" key={libro.id}>
                  <h3>{libro.titulo}</h3>
                  <strong>Autor:</strong> {libro.autor}
                  <strong>Categoría:</strong> {libro.categoria}
                  <button onClick={() => handleEditarLibro(libro)}>Editar</button>
                  
                </div>
              ))
          }

        </div>

        {editarLibro && <BookForm key={editarLibro.id} libro ={editarLibro} setEditarLibro={setEditarLibro} />}
      
      </>

    )
  }

  export default BookList