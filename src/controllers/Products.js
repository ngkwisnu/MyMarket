import Product from "../models/Product.js";

const allProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: "Get all product success!",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: err,
    });
  }
};

const productById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.sendStatus(404);
    const product = await Product.findById(id);
    if (!product) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: "Get product by id success!",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    if (!req.body) return res.sendStatus(404);
    const product = new Product(req.body);
    if (!product) return res.sendStatus(400);
    const result = await product.save();
    return res.status(200).json({
      status: 200,
      message: "Create product successfully!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.sendStatus(404);
    const result = await Product.findByIdAndUpdate(id, req.body);
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 200,
      message: "Update products by id successfully!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.sendStatus(404);
    const result = await Product.findByIdAndUpdate(id, {
      deleted_at: new Date(),
    });
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 200,
      message: "Product has been deleted!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export default {
  addProduct,
  allProduct,
  updateProduct,
  productById,
  deleteProduct,
};
