const express = require('express')
const {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrderStatus,
    deleteOrder
} = require('../Controllers/orderController')

const router = express.Router();

router.get('/getAllOrders',orderController. getAllOrders);
router.get('/getOrderById',orderController. getOrderById);
router.post('/ createOrder',orderController. createOrder);
router.put('/updateOrderStatus/:id',orderController. updateOrderStatus);
router.delete('/deleteOrder/:id',orderController. deleteOrder);

module.exports = router;