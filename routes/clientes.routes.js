import {Router} from "express";
import * as clientesController from "../controllers/cliente.controllers.js";

const router = Router();

router.get("/", clientesController.getClientes);

export default router;