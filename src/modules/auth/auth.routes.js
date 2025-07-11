// src/api/v1/aprendices/aprendiz.routes.js
import express from "express";
import {
  getAllAprendices,
  getAprendizById,
  createAprendiz,
  updateAprendiz,
  deleteAprendiz,
} from "./auth.controller.js";

const router = express.Router();

// Rutas para Aprendices
router.get("/listartodos", getAllAprendices);
router.get("/listarporid/:id", getAprendizById);
router.post("/crear", createAprendiz);
router.put("/actualizar/:id", updateAprendiz);
router.delete("/borrar/:id", deleteAprendiz);

export default router;
