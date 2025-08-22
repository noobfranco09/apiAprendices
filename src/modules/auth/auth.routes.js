import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  authUser,
  subirImagen
} from "./auth.controller.js";
import { autenticacionMiddleware } from "../helpers/adminTokens.js";
import multer from "multer";
const router = express.Router();

const almacenamiento = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./public/images/users')
  },
  filename:(req,file,cb)=>{
    cb(null,"user-"+Date.now()+file.originalname)
  }
})

const subirImagenMulter =multer({storage:almacenamiento})
// Rutas para Aprendices
router.get("/listartodos",autenticacionMiddleware, getAllUsers);
router.get("/listarporid/:id", getUserById);
router.post("/crear", createUser);
router.post("/subirimagen",[subirImagenMulter.single('file0')],subirImagen)
router.post("/login", authUser);
router.put("/actualizar/:id", updateUser);
router.delete("/borrar/:id", deleteUser);

export default router;
