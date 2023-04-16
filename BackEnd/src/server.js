import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import express from "express";
import bodyParser from "body-parser";
import * as dotenv from 'dotenv'

dotenv.config()
let app = express();


const result = dotenv.config()
console.log(process.env.PORT)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);

initWebRoutes(app);



let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port)
})


//npm start
