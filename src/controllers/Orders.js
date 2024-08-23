import Order from "../models/Orders.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import midtransClient from "../../node_modules/midtrans-client/index.js";

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-uUZatK0dRb9vrdKmFzSDJnJ0",
  clientKey: "SB-Mid-client-1OGYS8MQOJdhggpp",
});

const dataMidtrans = async (req, res) => {
  console.log(req);
};

const checkout = async (req, res) => {
  const { id } = req.params;
  const { qty } = req.body;
  const product = await Product.findById(id);
  const user = await User.findById(req.user.id);
  const params = {
    item_details: [
      {
        id: id,
        price: Math.round(product.product_price),
        quantity: qty,
        name: product.product_title,
        category: product.product_category,
        merchant_name: product.outlet,
      },
    ],
    customer_details: {
      first_name: user.firstname,
      last_name: user.lastname,
      email: user.email,
      phone: user.phone,
      address: user.address,
    },
    transaction_details: {
      order_id: "09LK",
      gross_amount: Math.round(product.product_price * qty),
    },
  };
  const token = await snap.createTransactionToken(params);
  res.send(token);
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
    const { address, payment_method, products } = req.body;
    const idprod = [];
    products.map((el) => {
      idprod.push(el.product_id);
    });
    const product = await Product.find({ _id: { $in: idprod } }).len();

    const uu = product.map((element) => {
      // console.log(element.id);
      products.map((el) => {
        if (el.product_id == element._id) {
          element.qty = el.qty;
          // console.log(element.qty);
        }
      });
      return element;
    });

    console.log(uu);
    // console.log(product);
    // const detailsprod = [];
    // product.map((prod) => {
    //   detailsprod.push({
    //     product_id: prod._id,
    //     product_title: prod.product_title,
    //     product_price: prod.product_price,
    //     product_description: prod.product_description,
    //     product_image: prod.product_image,
    //     product_category: prod.product_category,
    //     total_price: prod.product_price * qty,
    //     outlet: prod.outlet,
    //   });
    // });
    // console.log(detailsprod);
    // const {
    //   product_title,
    //   product_description,
    //   product_price,
    //   product_image,
    //   product_category,
    //   outlet,
    // } = product;
    // const total_price = product_price * qty;
    // const total_amount = 0;
    // const products = [];

    const order = new Order({
      user: req.user.id,
      status: "waiting",
      transaction_date: new Date(),
      address: address,
      payment_method: payment_method,
      products: [],
      total_amount: total_amount,
    });

    if (!order) return res.sendStatus(404);
    const user = await User.findById(req.user.id);
    const params = {
      item_details: [
        {
          id: id,
          price: Math.round(product.product_price),
          quantity: qty,
          name: product.product_title,
          category: product.product_category,
          merchant_name: product.outlet,
        },
      ],
      customer_details: {
        first_name: user.firstname,
        last_name: user.lastname,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      transaction_details: {
        order_id: order.id,
        gross_amount: Math.round(total_amount),
      },
    };

    const result = await order.save();

    const token = await snap.createTransaction(params);
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 200,
      data: {
        token: token,
      },
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
  checkout,
  dataMidtrans,
};
