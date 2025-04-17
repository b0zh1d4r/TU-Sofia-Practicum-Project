// Module importing the schema, model and types:
import { Schema, model, Types } from "mongoose";

// Creating the product schema:
const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required.'],
        minLength: [2, 'Name must be at least 2 characters long!']
    },

    productCategory: {
        type: String,
        required: true,
        enum: ['Food', 'Toys', 'Accessories', 'Grooming']
    },

    price: {
        type: Number,
        required: [true, 'Price is required.'],
        min: [0, 'Price must be a positive number!']
    },

    imageUrl: {
        type: String,
        required: [true, 'Image URL is required.'],
        match: [/^https?:\/\/.+/, 'Enter a valid Image URL (starting with http/https).'],
    },
    

    description: {
        type: String,
        required: [true, 'Description is required.'],
        minLength: [10, 'Description must be at least 10 characters long!']
    },

    owner: {
        type: Types.ObjectId,
        ref: 'User'
    },

    buyList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
});

// Creating the product model:
const Product = model('Product', productSchema);

// Exporting the product model:
export default Product;