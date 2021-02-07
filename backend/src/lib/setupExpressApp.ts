import bodyParser from "body-parser";
import express, { json, urlencoded } from "express";

export const setupExpressApp = () => {
  const app = express();
  app.use(json());
  app.use(urlencoded({ extended: true }));

  return app;
};
