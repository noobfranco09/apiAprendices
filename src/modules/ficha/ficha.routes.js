import express from 'express'
import {  createFicha}from './ficha.controller.js'
const router = express.Router();

router.post("/crear", createFicha);
export default router;