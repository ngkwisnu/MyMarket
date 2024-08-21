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

// next
