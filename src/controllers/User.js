import User from "../models/User.js";
import bcrypt from "bcrypt";

const allUser = async (req, res) => {
  try {
    const user = await User.find({});
    if (!user) return res.sendStatus(400);
    res.status(200).json({
      status: 200,
      message: "Get all data user!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error,
    });
  }
};

const userById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.sendStatus(404);
    const user = await User.findById(id);
    if (!user) return res.sendStatus(400);
    res.status(200).json({
      status: 200,
      message: "Get User by ID Successfully!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error,
    });
  }
};

const addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    if (!user) return res.sendStatus(400);
    user.image = `${req.file.filename}${req.file.originalname}`;
    console.log(user);
    if (!user.password) return res.sendStatus(400);
    user.password = await bcrypt.hash(user.password, 12);
    await user.save();
    return res.status(201).json({
      status: 201,
      message: "Create user successfully!",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Create User Failed!",
      error: error,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.sendStatus(404);
    if (!req.body) return res.sendStatus(404);
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const user = await User.findByIdAndUpdate(id, req.body);
    await user.save();
    res.status(200).json({
      status: 200,
      message: "Update user successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndUpdate(id, { deleted_at: new Date() });
    res.status(200).json({
      status: 200,
      message: `User by id: ${id} has been deleted!`,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: `User can't deleted!`,
    });
  }
};

export default { allUser, userById, addUser, updateUser, deleteUser };
