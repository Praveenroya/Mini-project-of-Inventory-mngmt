const Product = require("../models/Productmodel");

exports.createProduct = async (req, res) => {
  const { name, sku, description, price, current_stock, reorder_level } =req.body;
  try {
   const Product = await Product.create(
      { name, sku, description, price, current_stock, reorder_level },
      async (err, Product) => {
        if (err) {
          return res.status(500).json({ sucess: false, message: err.message });
        }
        res.status(201).json({
          sucess: true,
          message: "product created successfully",
          data: Product,
        });
      }
    );
  } catch (err) {
    res.status(500).json({ 
      sucess: false, 
      message: err.message ,
    });
  }
};

exports.getAllPoducts = async (req, res) => {
  try {
    Product.readAll(async (err, products) => {
      if (err) {
        res.status(500).json({ sucess: false, message: err.message });
      } else {
        res.status(200).json({
          sucess: true,
          message: "All produts retrieved successfully",
          data: products,
        });
      }
    });
  } catch (err) {
    res.status(500).json({ sucess: false, message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    Product.readById(id, async (err, product) => {
      if (err) {
        res.status(500).json({ sucess: false, message: err.message });
      }
      res.status(200).json({
        sucess: true,
        message: "Read Product Success",
        data: product,
      });
    });
  } catch (err) {
    res.status(500).json({ sucess: false, message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    Product.update(id, body, async (err, product) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false, message: err.message });
      }
      res.status(200).json({
        success: true,
        data: product,
      });
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  try {
    Product.delete(id, async (err, product) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.status(200).json({
        success: true,
        data: product,
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getProductByName = (req, res) => {
  const { name } = req.body;
  try {
    Product.readByName(name, async (err, product) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }

      res.status(200).json({
        success: true,
        data: product,
      });
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
  
