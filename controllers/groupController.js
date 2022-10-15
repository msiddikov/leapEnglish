const Group = require("../models/groupModel");

exports.addGroup = async (req, res, next) => {
  const { name, testLevel, link } = req.body;
  const group = await Group.create({ name, testLevel, link });
};
