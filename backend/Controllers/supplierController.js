const Supplier = require('../models/Supplier');

exports.createSupplier = async (req, res) => {
    const { name, contactInfo, products } = req.body;

    try {
        let supplier = new Supplier({ name, contactInfo, products });
        await supplier.save();
        res.json(supplier);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getAllSuppliers = async (req, res) => {
    try {
      Supplier.readAll(async (err, Suppliers) => {
        if (err) {
          res.status(500).json({ sucess: false, message: err.message });
        } else {
          res.status(200).json({
            sucess: true,
            message: "All Suppliers Successfull",
            data: Suppliers,
          });
        }
      });
    } catch (err) {
      res.status(500).json({ sucess: false, message: err.message });
    }
  };