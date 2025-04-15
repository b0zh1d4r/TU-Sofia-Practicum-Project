// Module importing everything we need:
import express from 'express';
import routes from './routes.js';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import { authMiddleware } from './middlewares/authMiddleware.js';

// Creating the app:
const app = express();

// Setup database:
const url = 'mongodb://localhost:27017';
mongoose.connect(url, { dbName: 'Zoodora' })
    .then(() => console.log('Connected to database!'))
    .catch((err) => console.log(`Failed to connect to database: ${err}`));
 
// * Setup view engine:
// Adding the view engine:
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

// Setting the view engine directory:
app.set('views', 'src/views');

// Setting the view engine:
app.set('view engine', 'hbs');

// * Setup Express:
// For every path that start with /static, use the static middleware that searches on /public:
app.use('/static', express.static('src/public'));
app.use('/utils', express.static('src/utils'));

// Setting the app to use urlencoded (read form data):
app.use(express.urlencoded({ extended: false }));

// Adding cookie parser middleware:
app.use(cookieParser());

// Assign auth middleware:
app.use(authMiddleware);

// Setting the app to use routes:
app.use(routes)

// Setting the app to listen on port 3000:
app.listen(3000, () => console.log('Server is listening on port: http://localhost:3000'));
