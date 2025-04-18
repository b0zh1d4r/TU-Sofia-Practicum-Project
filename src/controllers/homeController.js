// Module importing:
import { Router } from 'express';
import productService from '../services/productService.js';

// Creating homeController (router):
const homeController = Router();

// Setting the homeController:
homeController.get('/', async (req, res) => {
    const products = await productService.getAll().lean();
    const latestProducts = products.slice(-3).reverse();
    res.render('home', { title: 'Home Page', latestProducts });
});

homeController.get('/authorized', (req, res) => {
    res.send(req.user);
});

// Exporting homeController:
export default homeController;