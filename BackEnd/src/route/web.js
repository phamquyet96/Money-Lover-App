import express from "express";
import homeController from "../controllers/homeController";
import aboutController from "../controllers/homeController";
let router = express.Router();

let initWebRoutes = (app) => {

    //res api
    router.get('/', homeController.getHomePage);
    router.get('/about', aboutController.getAboutPage);

    return app.use("/", router);
}

export default initWebRoutes;