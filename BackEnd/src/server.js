import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import express from "express";
import bodyParser from "body-parser";
import * as dotenv from 'dotenv'
import connectDB from "./config/connectDB.js";
dotenv.config()
let app = express();
// const mysql = require('mysql');

const result = dotenv.config()
console.log(process.env.PORT)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);

initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port)
})


//npm start
//npx sequelize-cli db:migrate 