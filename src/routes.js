// Module importing:
import { Router } from "express";
import homeController from "./controllers/homeController.js";
import authController from "./controllers/authController.js";
import productController from "./controllers/productController.js";

// Creating routes:
const routes = Router();

// Setting the router:
routes.use(homeController);
routes.use('/auth', authController);
routes.use('/products', productController);

routes.all('*', (req, res) => {
    res.render('home/404', { title: '404 Page' });
});

// Exporting router:
export default routes;