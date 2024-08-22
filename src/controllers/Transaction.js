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

const addTransaction = async (req, res) => {
  try {
    const Transaction = new Transaction(req.body);
    if (!Transaction) return res.sendStatus(404);
    const result = await Transaction.save();
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 200,
      message: "Create Transaction data success!",
      data: Transaction,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const updateTransaction = async (req, res) => {
  try {
    if (!req.params.id) return res.sendStatus(404);
    const result = await Transaction.findByIdAndUpdate(req.params.id, req.body);
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 200,
      message: "Update Transaction successfully!",
      data: req.body,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
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
  addTransaction,
  allTransaction,
  transactionById,
  updateTransaction,
  deleteTransaction,
};
