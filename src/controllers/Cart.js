import Cart from "../models/Cart.js";

const allCart = async (req, res) => {
  try {
    const carts = await Cart.find({});
    if (!carts) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: "Get all cart success!",
      data: carts,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const cartById = async (req, res) => {
  try {
    if (req.params.id) return res.sendStatus(404);
    const cart = await Cart.findById(req.params.id);
    if (!cart) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: "Get cart by id successfully!",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const addCart = async (req, res) => {
  try {
    const cart = new Cart(req.body);
    if (!cart) return res.sendStatus(404);
    const result = await cart.save();
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 200,
      message: "Add cart successfully!",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const updateCart = async (req, res) => {
  try {
    if (!req.params.id) return res.sendStatus(404);
    const result = await Cart.findByIdAndUpdate(req.params.id, req.body);
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 200,
      message: "Update cart success!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const deleteCart = async (req, res) => {
  try {
    if (!req.params.id) return res.sendStatus(404);
    const result = await Cart.findByIdAndUpdate(req.params.id, {
      deleted_at: new Date(),
    });
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 200,
      message: "Cart has been deleted!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export default { allCart, addCart, cartById, updateCart, deleteCart };
