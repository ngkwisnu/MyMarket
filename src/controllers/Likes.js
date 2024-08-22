import Likes from "../models/Likes.js";

const likeByUser = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) return res.sendStatus(404);
    const Likes = await Likes.find({ user: id });
    if (!Likes) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: "Get Likes by id user successfully!",
      data: Likes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const likeByProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.sendStatus(404);
    const Likes = await Likes.find({ product: id });
    if (!Likes) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: "Get Likes by id product successfully!",
      data: Likes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const like = async (req, res) => {
  try {
    const liked = await Likes.findOne({
      user: req.body.user,
      product: req.body.product,
    });
    if (liked) {
      const result = await Likes.findByIdAndDelete(liked.id);
      if (!result) return res.sendStatus(400);
      return res.status(200).json({
        status: 200,
        message: "Unlike product successfully!",
        data: result,
      });
    } else {
      const likes = new Likes(req.body);
      if (!likes) return res.sendStatus(404);
      const result = await likes.save();
      if (!result) return res.sendStatus(400);
      return res.status(200).json({
        status: 200,
        message: "Like product successfully!",
        data: likes,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const countLikes = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "id not found!",
      });
    }
    const likes = await Likes.find({ product: id });
    const count = likes.length;
    return res.status(200).json({
      status: true,
      message: "Success get count like!",
      data: count,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error,
    });
  }
};

export default {
  likeByUser,
  likeByProduct,
  like,
  countLikes,
};
