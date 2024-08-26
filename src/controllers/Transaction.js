import Transaction from "../models/Transaction.js";

const allTransaction = async (req, res) => {
  try {
    const Transaction = await Transaction.find({});
    if (!Transaction) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: "Get all Transaction success!",
      data: Transaction,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const transactionById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.sendStatus(404);
    const Transaction = await Transaction.findById(id);
    if (!Transaction) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: "Get Transaction by id successfully!",
      data: Transaction,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const transactionByUser = async (req, res) => {
  const { id } = req.user;
  const transaction = await Transaction.findOne({ user: id });
  return res.status(200).json({
    status: true,
    message: "Success get transaction by user",
    data: order,
  });
};

const transactionByProduct = async (req, res) => {
  const { id } = req.params;
  const productInTransaction = await Transaction.find({
    products: { $in: id },
  });
  return res.status(200).json({
    status: 200,
    message: "Successfully to get data product in Transaction",
    data: productInTransaction,
  });
};

const transactionByOutlet = async (req, res) => {
  const { id } = req.params;
  const tranckingTransaction = await Transaction.find({
    outlet: id,
  });
  return res.status(200).json({
    status: 200,
    message: "Successfully to get data transaction by outlet",
    data: productInTransaction,
  });
};

const deleteTransaction = async (req, res) => {
  try {
    if (!req.params.id) return res.sendStatus(404);
    const result = await Transaction.findByIdAndUpdate(req.params.id, {
      deleted_at: new Date(),
    });
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 500,
      message: "Transaction has been deleted!",
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
  allTransaction,
  transactionById,
  deleteTransaction,
  transactionByUser,
  transactionByProduct,
  transactionByOutlet,
};
