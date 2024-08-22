import Rate from "../models/Rate.js";
import Product from "../models/Product.js";

const allRate = async (req, res) => {
  try {
    const Rate = await Rate.find({});
    if (!Rate) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: "Get all Rate success!",
      data: Rate,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const rateById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.sendStatus(404);
    const Rate = await Rate.findById(id);
    if (!Rate) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: "Get Rate by id successfully!",
      data: Rate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const addRate = async (req, res) => {
  try {
    const { id_product } = req.params;
    const product = await Product.findById(id_product);
    const Rate = new Rate(req.body);
    if (!Rate) return res.sendStatus(404);
    product.push(Rate.id);
    await product.save();
    const result = await Rate.save();
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 200,
      message: "Berhasil menambahkan ulasan di produk!",
      data: Rate,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const updateRate = async (req, res) => {
  try {
    if (!req.params.id) return res.sendStatus(404);
    const result = await Rate.findByIdAndUpdate(req.params.id, req.body);
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 200,
      message: "Update Rate successfully!",
      data: req.body,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const deleteRate = async (req, res) => {
  try {
    if (!req.params.id) return res.sendStatus(404);
    const result = await Rate.findByIdAndUpdate(req.params.id, {
      deleted_at: new Date(),
    });
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 500,
      message: "Rate has been deleted!",
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
  addRate,
  allRate,
  rateById,
  updateRate,
  deleteRate,
};
