// to load environment variables
import dotenv from "dotenv";
dotenv.config();

//importing modules
import express from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";

import { connectDB } from "./config/db.js";
import habitRouter from "./src/routes/routes.js";

//setting up server
const server = express();

//setting up server using ejs
server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src/views"));
console.log(path.join(path.resolve(), "src", "views"));

server.use(ejsLayouts);

//to decode request body
server.use(express.urlencoded({ extended: true }));

//to read static files
server.use(express.static("public"));

//HANDLING ALL THE REQUEST TO THIS ROUTE
server.use("/", habitRouter);

//server
server.listen(process.env.PORT, () => {
  console.log(`server is listening to port ${process.env.PORT}`);
  connectDB();
});
