import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  authUser,
} from "./auth.controller.js";
import { autenticacionMiddleware } from "../helpers/adminTokens.js";
const router = express.Router();

// Rutas para Aprendices
router.get("/listartodos",autenticacionMiddleware, getAllUsers);
router.get("/listarporid/:id", getUserById);
router.post("/crear", createUser);
router.post("/login", authUser);
router.put("/actualizar/:id", updateUser);
router.delete("/borrar/:id", deleteUser);

export default router;
