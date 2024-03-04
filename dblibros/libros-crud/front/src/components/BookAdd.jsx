import BookForm from "./BookForm"

function BookAdd () {

  const emptyBook = {
    id:0, titulo:"", autor:"", categoria:""
  }
    return (
      <>
      
      <h1>Agregar Libros</h1>
      <BookForm libro={emptyBook}/>
      
      </>

    )
  }

  export default BookAdd