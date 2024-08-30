const express = require('express')
const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../Controllers/productController')

const router = express.Router();

router.get('/getAllProducts', productController.getAllProducts);
router.get('/getProductById',productController. getProductById);
router.post('/createProduct',productController. createProduct);
router.put('/updateProduct)/:id', productController.updateProduct);
router.delete('/deleteProduct/:id',productController. deleteProduct);

module.exports = router;