// Module importing bcrypt:
import jwt from "../lib/jwt.js";
import User from "../models/User.js";
import bcrypt from 'bcrypt';

// Creating an object that will save all our function:
const authService = {
    async register(username, email, phoneNumber, password, rePassword) {
        const user = await User.findOne({ $or: [{ email }, { username }] });

        if (password !== rePassword) {
            throw new Error('Password mismatch!');
        }

        if (user) {
            throw new Error('User already exists!');
        }

        const newUser = await User.create({
            username,
            email,
            phoneNumber,
            password
        });

        return this.generateToken(newUser)
    },

    async login(email, password) {
        // Get user from database:
        const user = await User.findOne({ email });

        // Throw error if user doesn't exist:
        if (!user) {
            throw new Error('Invalid user or password!');
        }

        // Check password:
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error('Invalid user or password!');
        }

        return this.generateToken(user);
    },

    async generateToken(user) {
        // Generate token:
        const payload = { // Payload is the information that we want to save in the token.
            _id: user._id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            username: user.username
        }

        const header = { expiresIn: '2h' };

        const token = await jwt.sign(payload, process.env.JWT_SECRET, header);

        // Return token:
        return token;
    }
};

// Exporting the whole object:
export default authService;