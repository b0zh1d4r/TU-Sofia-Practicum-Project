// Module importing:
import { Router } from "express";
import productService from "../services/productService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

// Creating the product controller:
const productController = Router();

// Setting the product controller:

productController.get('/', async (req, res) => {
    const products = await productService.getAll().lean();

    res.render('product', { title: 'Products Page', products });
});

productController.get('/create', (req, res) => {
    const productCategoryData = getProductCategoryTypeData({});
    res.render('product/create', { title: 'Create Page', productCategories: productCategoryData });
});

productController.post('/create', async (req, res) => {
    const productData = req.body;
    const userId = req.user._id;

    try {
        await productService.create(productData, userId);
        res.redirect('/products');
    } catch (err) {
        const error = getErrorMessage(err);
        const productCategoryData = getProductCategoryTypeData(productData);

        return res.render('product/create', { product: productData, productCategories: productCategoryData, error });
    }
});

productController.get('/:productId/details', async (req, res) => {
    const product = await productService.getOne(req.params.productId).lean();
    const isOwner = product.owner.toString() === req.user?._id;
    const hasBought = product.buyList?.some(userId => userId.toString() === req.user?._id);


    res.render('product/details', { title: 'Details Page', product, isOwner, hasBought });
});

productController.get('/:productId/buy', async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user._id;

    try {
        await productService.buy(productId, userId);

        res.redirect(`/products/${productId}/details`);
    } catch (err) {
        console.log(err);
    }
});

// Exporting the product controller:
export default productController;

// Creating a function that is listing product categories:
function getProductCategoryTypeData({ productCategory }) {
    // Listing all the product categories:
    const productCategories = [
        'Food',
        'Toys',
        'Accessories',
        'Grooming'
    ];

    const viewData = productCategories.map(type => ({ value: type, label: type, selected: productCategory === type ? 'selected' : '' }));
    return viewData;
}