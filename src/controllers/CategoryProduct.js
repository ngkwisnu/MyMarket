import CategoryProduct from "../models/CategoryProduct.js";

const allCategory = async (req, res) => {
  try {
    const categorys = await CategoryProduct.find({});
    if (!categorys) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: "Get all categorys product success!",
      data: categorys,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const categoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryProduct.findById(id);
    if (!category) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: "Get category product by id successfully!",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const addCategory = async (req, res) => {
  try {
    if (!req.body) return res.sendStatus(400);
    const category = new CategoryProduct(req.body);
    if (!category) return res.sendStatus(400);
    await category.save();
    return res.status(200).json({
      status: 200,
      message: "Create category success!",
      data: category,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.sendStatus(404);
    const result = await CategoryProduct.findByIdAndUpdate(id, req.body);
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 200,
      message: "Update category successfully!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.sendStatus(404);
    const result = await CategoryProduct.findByIdAndUpdate(id, {
      deleted_at: new Date(),
    });
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 200,
      message: "Category has been deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export default {
  addCategory,
  allCategory,
  categoryById,
  updateCategory,
  deleteCategory,
};
