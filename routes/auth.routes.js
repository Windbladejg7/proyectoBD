import {Router} from "express";
import * as authControllers from "../controllers/authUser.controllers.js";
import * as authAdminControllers from "../controllers/authEmployee.controllers.js";

const router = Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);

router.post("/admin/register", authAdminControllers.register);
router.post("/admin/login", authAdminControllers.login);

export default router;