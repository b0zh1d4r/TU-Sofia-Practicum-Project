// Module importing:
import { Router } from 'express';
import productService from '../services/productService.js';
import { isAuth } from '../middlewares/authMiddleware.js';

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

homeController.get('/about', async (req, res) => {
    res.render('home/about', { title: 'About Page' });
});

homeController.get('/profile', isAuth, async (req, res) => {
    const user = req.user;
    const userId = req.user?._id;

    const createdProducts = await productService.getMyCreatedProducts(userId).lean();

    res.render('home/profile', { title: 'Profile Page', createdProducts, user });
});

// Exporting homeController:
export default homeController;