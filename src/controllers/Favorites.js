import Favorites from "../models/Favorites.js";

const favoriteByUser = async (req, res) => {
  try {
    const { id } = req.user;
    if (!id) return res.sendStatus(404);
    const Favorites = await Favorites.findOne({ user: id });
    if (!Favorites) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: "Get Favorites by id user successfully!",
      data: Favorites,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const favoriteByProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.sendStatus(404);
    const Favorites = await Favorites.findOne({ product: id });
    if (!Favorites) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: "Get Favorites by id product successfully!",
      data: Favorites,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const favorite = async (req, res) => {
  try {
    const favorite = await Favorites.findOne({
      user: req.body.user,
      product: req.body.product,
    });
    if (favorite) {
      const result = await Favorites.findByIdAndDelete(favorite.id);
      if (!result) return res.sendStatus(400);
      return res.status(200).json({
        status: 500,
        message: "Menghapus product dari favorite",
        data: result,
      });
    } else {
      const Favorites = new Favorites(req.body);
      if (!Favorites) return res.sendStatus(404);
      const result = await Favorites.save();
      if (!result) return res.sendStatus(400);
      return res.status(200).json({
        status: 200,
        message: "Berhasil menyimpan product ke favorite",
        data: Favorites,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const countFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({
        status: false,
        message: "id not found!",
      });
    }
    const favorite = await Favorites.find({ product: id });
    const count = favorite.length;
    return res.status(200).json({
      status: true,
      message: "Success get count favorite!",
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
  favoriteByProduct,
  favoriteByUser,
  favorite,
  countFavorite,
};
