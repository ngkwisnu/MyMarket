import Order from "../models/Orders.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import midtransClient from "../../node_modules/midtrans-client/index.js";
import Transaction from "../models/Transaction.js";

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.SERVER_KEY,
  clientKey: process.env.CLIENT_KEY,
});

const insertTransaction = async (req, res) => {
  console.log("Transactions Load!");
  const result = await snap.transaction.notification(req.body);
  if (result.transaction_status !== "capture") {
    const order = await Order.findByIdAndUpdate(result.order_id, {
      status: result.transaction_status,
    });
    await order.save();
    return res.status(400).json({
      status: false,
      message: result.status_message,
    });
  } else {
    await Order.findByIdAndUpdate(result.order_id, {
      status: result.transaction_status,
    });
    const order = await Order.findById(result.order_id).populate("products");
    const outlet_id = [];
    order.products.forEach((el) => {
      const outletIds = String(el.outlet);
      if (!outlet_id.includes(outletIds)) {
        outlet_id.push(outletIds);
      }
    });

    outlet_id.forEach(async (el) => {
      let arr = [];
      order.products.forEach((poutlet) => {
        if (el == poutlet.outlet) {
          arr.push(poutlet);
        }
      });
      const transaction = new Transaction({
        user: order.user,
        order_id: result.order_id,
        transaction_date: result.transaction_time,
        address: order.address,
        payment_method: result.payment_type,
        products: arr,
        outlet: el,
        total_amount: order.total_amount,
      });
      await transaction.save();
      arr = [];
    });
    return res.status(200).json({
      status: 200,
      message: "Berhasil melakukan pembelian!",
    });
  }
};

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

const orderByUser = async (req, res) => {
  const { id } = req.user;
  const order = await Order.findOne({ user: id });
  return res.status(200).json({
    status: true,
    message: "Success get order by user",
    data: order,
  });
};

const orderByProduct = async (req, res) => {
  const { id } = req.params;
  const productInOrder = await Order.find({ products: { $in: id } });
  return res.status(200).json({
    status: 200,
    message: "Successfully to get data product in Order",
    data: productInOrder,
  });
};

const addOrder = async (req, res) => {
  try {
    const { address, products } = req.body;
    const idprod = products.map((el) => el.product_id);
    const product = await Product.find({ _id: { $in: idprod } })
      .populate("outlet")
      .populate("product_category");

    const detailsprod = product.map((prod, index) => ({
      product_id: prod._id,
      product_title: prod.product_title,
      product_price: Math.round(prod.product_price),
      product_description: prod.product_description,
      product_image: prod.product_image,
      product_category: prod.product_category._id,
      qty: products[index].qty,
      total_price: Math.round(prod.product_price * products[index].qty),
      outlet: prod.outlet._id,
    }));

    const total_amount = detailsprod.reduce((sum, i) => sum + i.total_price, 0);

    const order = new Order({
      user: req.user.id,
      status: "waiting",
      transaction_date: new Date(),
      address: address,
      products: detailsprod,
      total_amount: Math.round(total_amount),
    });

    const items = product.map((el, i) => ({
      id: el._id,
      price: Math.round(el.product_price),
      quantity: products[i].qty,
      name: el.product_title,
      category: el.product_category.category_name,
      merchant_name: el.outlet.outlet_name,
    }));

    if (!order) return res.sendStatus(404);
    const user = await User.findById(req.user.id);

    const params = {
      item_details: items,
      customer_details: {
        first_name: user.username,
        last_name: user.username,
        email: user.email,
      },
      transaction_details: {
        order_id: order.id,
        gross_amount: Math.round(total_amount),
      },
    };

    console.log(params);

    const result = await order.save();
    snap
      .createTransaction(params)
      .then((transaction) => {
        return res.status(200).json({
          status: 200,
          data: {
            token: transaction,
          },
        });
      })
      .catch((e) => {
        console.log("Error occured:", e.message);
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

export default {
  addOrder,
  allOrder,
  orderById,
  updateOrder,
  deleteOrder,
  orderByProduct,
  orderByUser,
  insertTransaction,
};
