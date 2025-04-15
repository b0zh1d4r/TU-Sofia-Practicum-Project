// Module importing Router:
import { Router } from 'express';

// Creating homeController (router):
const homeController = Router();

// Setting the homeController:
homeController.get('/', (req, res) => {
    res.render('home', { title: 'Home Page' });
});

homeController.get('/authorized', (req, res) => {
    res.send(req.user);
});

// Exporting homeController:
export default homeController;