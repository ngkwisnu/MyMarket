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

const cartByUser = async (req, res) => {
  try {
    if (req.user.id) return res.sendStatus(404);
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: "Get cart by user successfully!",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const addItemToCart = async (req, res) => {
  try {
    const cartUser = await Cart.findOne({ user: req.user.id });
    if (!cartUser) {
      const cart = new Cart(req.body);
      if (!cart) return res.sendStatus(404);
      const result = await cart.save();
      if (!result) return res.sendStatus(400);
      return res.status(200).json({
        status: 200,
        message: "Add cart successfully!",
        data: cart,
      });
    } else {
      const [products] = req.body;
      const cart = await Cart.findOne({ user: req.user.id });
      cart.products.push(product);
      await cart.save();
      return res.status(200).json({
        status: true,
        message: "Success add product to cart!",
        data: product,
      });
    }
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

const findProductInCart = async (req, res) => {
  const { id } = req.params;
  const products = await Cart.find({ products: { $in: id } });
  const total = products.length;
  return res.status(200).json({
    status: true,
    message: "Find product using id in cart successfully!",
    data: {
      products: products,
      total: total,
    },
  });
};

export default {
  allCart,
  addItemToCart,
  cartByUser,
  updateCart,
  findProductInCart,
};
