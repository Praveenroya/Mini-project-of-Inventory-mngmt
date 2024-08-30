const Product = require("../models/Productmodel");
const Order = require("../models/Ordermodel");

exports.createOrder = async (req, res) => {
  const { product_id, quantity, order_date, status } = req.body;
  try {
   
    // Create the order
    const order = await Order.create({ product_id, quantity, order_date, status });
    if (!order) {
      return res.status(500).json({ error: "Failed to create order" });
    }
     res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the order",
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
   
        res.status(200).json({
          sucess: true,
          message: "All Orders retrieved successfully",
          data: orders,
        })
      }catch (err) {
    res.status(500).json({ sucess: false, message: err.message });
  }
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    Order.readById(id, async (err, order) => {
      if (err) {
        res.status(500).json({ sucess: false, message: err.message });
      }
      res.status(200).json({
        sucess: true,
        message: "Read Order Success",
        data: order,
      });
    });
  } catch (err) {
    res.status(500).json({ sucess: false, message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
   
        const product = Product.readById(
          body.product_id,
          async (err, product) => {
            if (err) {
              res.status(500).json({ sucess: false, message: "In order Status error at Product Updating  "+err.message  });
            }
            res.status(200).json({
              sucess: true,
              message: "Read Product Success",
              data: product,
            });
          }
        );
        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }
        res.status(200).json({
        success: true,
        data: order,
      });
  
  } catch (err) {
    res.status(500).json({ success: false, message: "catch while Updating   "+ err.message });
  }
};

exports.deleteOrder = (req, res) => {
  const { id } = req.params;
  try {
       res.status(200).json({
        success: true,
        data: order,
      });
    
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
