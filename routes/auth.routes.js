import {Router} from "express";
import * as authControllers from "../controllers/auth.controllers.js";

const router = Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
export default router;