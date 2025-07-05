import {Router} from "express";
import * as pedidosController from "../controllers/pedidos.controllers.js";
import { accesoRestringido } from "../middlewares/admin.js";

const router = Router();

router.post("/", pedidosController.agregarPedido);
router.get("/", pedidosController.obtenerPedidosDeUsuario);
router.get("/admin", accesoRestringido, pedidosController.obtenerTodos);
router.put("/:id", pedidosController.actualizarPedido);

router.delete("/:id", pedidosController.cancelarPedido);
//Agregar ruta para obtener todos los pedidos (admin)

export default router;