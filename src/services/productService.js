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
    buy(productId, userId) {
        return Product.findByIdAndUpdate(productId, { $push: { buyList: userId } });
    },
    remove(productId) {
        return Product.findByIdAndDelete(productId);
    },
    edit(productId, productData) {
        return Product.findByIdAndUpdate(productId, productData, { runValidators: true });
    },
    getMyCreatedProducts(userId) {
        return Product.find({ owner: userId });
    },
};

// Exporting the product Service:
export default productService;