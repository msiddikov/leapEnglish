const Group = require("../models/groupModel");

exports.addGroup = async (req, res, next) => {
  try {
    const { name, testLevel, link } = req.body;
    const group = await Group.create({ name, testLevel, link });
    res
      .status(200)
      .json({
        isOk: true,
        data: {
          group: {
            name: group.name,
            testLevel: group.testLevel,
            link: group.link,
          },
        },
        message: "group added",
      });
  } catch (error) {
    res.status(404).json({ isOk: false, message: error.message, data: "" });
  }
};

exports.getAllGroup = async (req, res, next) => {
  try {
    const groups = await Group.findAll();
    res
      .status(200)
      .json({ isOk: true, message: "get all groups", data: groups });
  } catch (error) {
    res.status(404).json({ isOk: false, message: error.message, data: "" });
  }
};

exports.getOneGroup = async (req, res, next) => {
  try {
    const group = await Group.findOne({ where: { id: req.params.id } });
    res.status(200).json({ isOk: true, message: "group get", data: { group } });
  } catch (error) {
    res.status(404).json({ isOk: false, message: error.message, data: "" });
  }
};

exports.updateGroup = async (req, res, next) => {
  try {
    const group = await Group.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });
    res
      .status(200)
      .json({ isOk: true, message: "group updated", data: { group } });
  } catch (error) {
    res.status(404).json({ isOk: false, message: error.message, data: "" });
  }
};

exports.deleteGroup = async (req, res, next) => {
  try {
    const group = await Group.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ isOk: true, message: "group deleted", data: "" });
  } catch (error) {
    res.status(404).json({ isOk: false, message: error.message, data: "" });
  }
};
