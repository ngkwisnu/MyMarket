import Outlet from "../models/Outlet.js";

const allOutlet = async (req, res) => {
  try {
    const outlets = await Outlet.find({});
    if (!outlets) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: "Get all outlets success!",
      data: outlets,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const outletById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.sendStatus(404);
    const outlet = await Outlet.findById(id);
    if (!outlet) return res.sendStatus(404);
    return res.status(200).json({
      status: 200,
      message: `Get data by id:${id} successfully!`,
      data: outlet,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const addOutlet = async (req, res) => {
  try {
    if (!req.body) return res.sendStatus(404);
    const outlet = new Outlet(req.body);
    await outlet.save();
    return res.status(200).json({
      status: 200,
      message: "Create outlet successfully!",
      data: outlet,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const updateOutlet = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.sendStatus(404);
    const result = await Outlet.findByIdAndUpdate(id, req.body);
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 200,
      message: "Update outlet successfully!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

const deleteOutlet = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Outlet.findByIdAndUpdate(id, {
      deleted_at: new Date(),
    });
    if (!result) return res.sendStatus(400);
    return res.status(200).json({
      status: 200,
      message: "Outlet has been deleted!",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};

export default { allOutlet, outletById, addOutlet, updateOutlet, deleteOutlet };
