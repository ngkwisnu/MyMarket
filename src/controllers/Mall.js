import Mall from "../models/Mall.js";

const allMall = async (req, res) => {
  try {
    const malls = await Mall.find({});
    if (!malls) return res.sendStatus(400);
    res.status(200).json({
      status: 200,
      message: "Get all Mall Success!",
      data: malls,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export default { allMall };
