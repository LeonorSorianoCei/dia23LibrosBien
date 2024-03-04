import './App.css'
import {Routes, Route, Outlet, Link} from "react-router-dom"
import { NotFound } from './components/NotFound'
import Home from './components/Home'
import Navigation from './components/Navigation'
import BookList from './components/BookList'
import BookAdd from './components/BookAdd'
import AuthorList from './components/AuthorList'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Home/>} /> 
      <Route path="/lista" element={<BookList/>} /> 
      <Route path="/agregar" element={<BookAdd/>} /> 
      <Route path="/autores" element={<AuthorList/>} />
      <Route path='*' element={<NotFound/>} ></Route>
      </Route>
    </Routes>
    </>
  )
}
// plantilla de toda nuestra app
function Layout () {
  return (
    <>
      <Navigation/>
      {/* El Outlet renderiza el Child que provenga del Route */}
      <div className="content">
      <Outlet/> 
      </div>
      <footer className='footer'>Soy footer</footer>
    </>
  )
}
export default App
