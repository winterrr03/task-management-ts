import express, { Express } from "express";
import env from "dotenv";
env.config();

import { connect } from "./config/database";

connect();

const app: Express = express();
const port: (number | string) = `${process.env.PORT}` || 3000;

import v1Route from "./api/v1/routes/index.route";

v1Route(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});