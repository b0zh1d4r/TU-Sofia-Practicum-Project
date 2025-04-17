// Module importing:
import Product from "../models/Product.js";

// Creating an object that will save all our functions:
const productService = {
    getAll() {
        return Product.find();
    },
    getOne(productId) {
        return Product.findById(productId);
    },
    create(productData, userId) {
        return Product.create({ ...productData, owner: userId });
    },
    async buy(productId, userId) {
        return Product.findByIdAndUpdate(productId, { $push: { buyList: userId }}); 
    }
};

// Exporting the product Service:
export default productService;