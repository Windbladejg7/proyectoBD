import {Router} from "express";
import * as serviciosController from "../controllers/servicios.controllers.js";

const router = Router();

router.get("/", serviciosController.getServicios);
router.post("/", serviciosController.agregarServicio); //Corregir: necesita autenticacion (solo admins)

export default router;