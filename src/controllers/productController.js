// Module importing:
import { Router } from "express";
import productService from "../services/productService.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { isAuth } from "../middlewares/authMiddleware.js";

// Creating the product controller:
const productController = Router();

// Setting the product controller:

productController.get('/', async (req, res) => {
    const products = await productService.getAll().lean();

    res.render('product', { title: 'Products Page', products });
});

productController.get('/create', isAuth, (req, res) => {
    const productCategory = getProductCategoryTypeData({});
    res.render('product/create', { title: 'Create Page', productCategory });
});

productController.post('/create', isAuth, async (req, res) => {
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

productController.get('/:productId/buy', isAuth, async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user._id;
    const product = await productService.getOne(productId);
    const isOwner = product.owner.toString() === userId;

    if (!isOwner) {
        return res.redirect(`/404`);
    }

    try {
        await productService.buy(productId, userId);

        res.redirect(`/products/${productId}/details`);
    } catch (err) {
        console.log(err);
    }
});

productController.get('/:productId/delete', isAuth, async (req, res) => {
    const productId = req.params.productId;

    try {
        await productService.remove(productId);

        res.redirect('/products');
    } catch (err) {
        console.log(err);

        res.redirect(`/products/${productId}/details`);
    }
});

productController.get('/:productId/edit', isAuth,  async (req, res) => {
    const product = await productService.getOne(req.params.productId).lean();
    const productCategory = getProductCategoryTypeData(product);

    res.render('product/edit', { title: 'Edit Page', product, productCategory });
});

productController.post('/:productId/edit', isAuth, async (req, res) => {
    const productId = req.params.productId;
    const productData = req.body;

    try {
        await productService.edit(productId, productData);
        
        res.redirect(`/products/${productId}/details`);
    } catch (err) {
        const productCategory = getProductCategoryTypeData(productData);
        const error = getErrorMessage(err);

        res.render('product/edit', { title: 'Edit Page', product: productData, productCategory, error });
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

// Creating a function/helper middleware:
function productOwnershipMiddleware(req, res, next) {
    const isOwner = req.user?._id ===
}