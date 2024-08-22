import GroupCategory from "../models/GroupCategory.js";

const allGroup = async (req, res) => {
  try {
    const groupCategory = await GroupCategory.find();
    if (!groupCategory) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: "Get all group category success!",
      data: groupCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const groupById = async (req, res) => {
  try {
    if (!req.params.id) return res.sendStatus(404);
    const groupCategory = await GroupCategory.findById(req.params.id);
    if (!groupCategory) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: "Get group category by id successfully!",
      data: groupCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const addGroup = async (req, res) => {
  try {
    const group = new GroupCategory(req.body);
    if (!group) return res.sendStatus(404);
    const result = await group.save();
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 200,
      message: "Create group category success!",
      data: group,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const updateGroup = async (req, res) => {
  try {
    if (!req.params.id) return res.sendStatus(404);
    const result = await GroupCategory.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 200,
      message: "Update Group successfully!",
      data: req.body,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const deleteGroup = async (req, res) => {
  try {
    if (!req.params.id) return res.sendStatus(404);
    const result = await GroupCategory.findByIdAndUpdate(req.params.id, {
      deleted_at: new Date(),
    });
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 500,
      message: "Group has been deleted!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export default { allGroup, groupById, addGroup, updateGroup, deleteGroup };
