// Module importing Router:
import { Router } from 'express';
import authService from '../services/authService.js';
import { AUTH_COOKIE_NAME } from '../constants.js';
import { getErrorMessage } from '../utils/errorUtils.js';
import { isAuth, isGuest } from '../middlewares/authMiddleware.js';

// Creating the auth controller:
const authController = Router();

// Setting the auth controller:
authController.get('/register', isGuest, (req, res) => {
    res.render('auth/register', { title: 'Register Page' });
});

authController.post('/register', isGuest, async (req, res) => {
    // Get input:
    const { username, email, phoneNumber, password, repeatPassword } = req.body;

    // Call authService register:
    try {
        const token = await authService.register(username, email, phoneNumber, password, repeatPassword);
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });

        // Redirect to home:
        res.redirect('/');
    } catch (err) {
        const error = getErrorMessage(err)
        res.render('auth/register', { title: 'Register Page', username, email, phoneNumber, error });
    }
});

authController.get('/login', isGuest, (req, res) => {
    res.render('auth/login', { title: 'Login Page' });
});

authController.post('/login', isGuest, async (req, res) => {
    // Get login data:
    const { email, password } = req.body;

    try {
        // Use auth service login:
        const token = await authService.login(email, password);

        // Add token to cookie:
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });

        // Redirect to home page:
        res.redirect('/');

    } catch (err) {
        const error = getErrorMessage(err)
        res.render('auth/login', { title: 'Login Page', email, error })
    }
});

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/');
});

// Exporting the auth controller:
export default authController;