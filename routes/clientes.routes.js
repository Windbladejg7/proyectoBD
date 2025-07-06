import {Router} from "express";
import * as clientesController from "../controllers/cliente.controllers.js";

const router = Router();

//router.get("/", clientesController.getClientes);
router.get("/", clientesController.obtenerUsuario);
export default router;