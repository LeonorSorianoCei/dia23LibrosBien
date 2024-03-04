import { Router } from "express";
import {getAllLibros, createLibro, getLibroById, updateLibro, deleteLibro} from "../controllers/libros.controller.js"
const router = Router()



router.get("/libros", getAllLibros);

// CreateReadUpdateDelete - CRUD

router.post("/libros", createLibro);        // create
router.get("/libros/:id", getLibroById);    // read
router.put("/libros/:id", updateLibro);     // update
router.delete("/libros/:id", deleteLibro);  // delete



export default router