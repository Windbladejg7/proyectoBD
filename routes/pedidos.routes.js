import {Router} from "express";
import * as pedidosController from "../controllers/pedidos.controllers.js";

const router = Router();

router.post("/", pedidosController.agregarPedido);
router.get("/", pedidosController.obtenerPedidosDeUsuario);
//Agregar ruta para obtener todos los pedidos (admin)

export default router;