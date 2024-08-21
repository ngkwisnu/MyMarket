import Order from "../models/Orders.js";

const allOrder = async (req, res) => {
  try {
    const orders = await Order.find({});
    if (!orders) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: "Get all orders success!",
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const orderById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.sendStatus(404);
    const order = await Order.findById(id);
    if (!order) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: "Get order by id successfully!",
      data: order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const addOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    if (!order) return res.sendStatus(404);
    const result = await order.save();
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 200,
      message: "Create order data success!",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    if (!req.params.id) return res.sendStatus(404);
    const result = await Order.findByIdAndUpdate(req.params.id, req.body);
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 200,
      message: "Update order successfully!",
      data: req.body,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    if (!req.params.id) return res.sendStatus(404);
    const result = await Order.findByIdAndUpdate(req.params.id, {
      deleted_at: new Date(),
    });
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 500,
      message: "Order has been deleted!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export default { addOrder, allOrder, orderById, updateOrder, deleteOrder };
