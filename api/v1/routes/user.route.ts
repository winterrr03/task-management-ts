import express, { Router } from "express";
const router: Router = express.Router();

import * as controller from "../controller/user.controller";

router.post("/register", controller.register);

router.post("/login", controller.login);

export const userRoutes: Router = router;