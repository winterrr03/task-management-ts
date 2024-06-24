import express, { Router } from "express";
const router: Router = express.Router();

import * as controller from "../controller/user.controller";

import { requireAuth } from "../middlewares/auth.middleware";

router.post("/register", controller.register);

router.post("/login", controller.login);

router.get(
  "/detail", 
  requireAuth, 
  controller.detail
);

export const userRoutes: Router = router;