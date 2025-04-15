// Module importing the schema and the model:
import { Schema, model } from 'mongoose';

// Module importing bcrypt:
import bcrypt from 'bcrypt';

// Setting the salt rounds:
const SALT_ROUNDS = 10;

// Creating the user schema:
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        minlength: [2, 'Username must be at least 2 characters long!']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format.']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required.'],
        match: [/^\+?\d{7,15}$/, 'Phone number must be between 7 and 15 digits!']
    },
    password: {
        type: String, 
        required: [true, 'Password is required.'],
        match: [/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/, 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number!'],
    },
});

// Creating a function that will hash the password before it's saved:
userSchema.pre('save', async function () {
    const hash = await bcrypt.hash(this.password, SALT_ROUNDS);

    this.password = hash;
});

// Creating the User model:
const User = model('User', userSchema);

// Exporting the model:
export default User;