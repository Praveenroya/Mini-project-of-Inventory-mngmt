const express = require('express')
const {
    getAllSuppliers,
    createSupplier,
    
} = require('../Controllers/productController');
const { createSupplier } = require('../Controllers/supplierController');

const router = express.Router();

router.get('/getAllSuppliers',supplierController. getAllSuppliers);

router.post('/createSupplier',supplierController. createSupplier);


module.exports = router;