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
        required: [true, 'Username is required!']
    },
    email: {
        type: String,
        required: [true, 'Email is required!']
    },
    password: {
        type: String,
        required: [true, 'Password is required!']
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