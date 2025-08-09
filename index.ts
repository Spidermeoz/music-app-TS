import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path"

import * as database from "./config/database";

import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/config";

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

dotenv.config();

database.connect();

app.use(express.static("public"))

app.set("views", `./views`);
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin

// Admin routes
adminRoutes(app);

// Client routes
clientRoutes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
