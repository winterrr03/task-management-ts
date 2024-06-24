import express, { Router } from "express";
const router: Router = express.Router();

import * as controller from "../controller/task.controller";

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

export const taskRoutes: Router = router;