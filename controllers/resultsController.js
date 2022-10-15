const Result = require("../models/resultsModel");

exports.addResult = async (req, res, next) => {
  try {
    const { userId, date, results, testLevel } = req.body;
    await Result.create({ userId, date, results, testLevel });
    res.status(200).json({
      message: "success added result",
      data: "",
      isOk: true,
    });
  } catch (error) {
    res.status(404).json({
      isOk: false,
      data: "",
      message: error.message,
    });
  }
};

exports.getResults = async (req, res, next) => {
  try {
    const results = await Result.findAll({ where: { userId: req.user.id } });
    res.status(200).json({
      message: "success added result",
      data: { results },
      isOk: true,
    });
  } catch (error) {
    res.status(404).json({
      isOk: false,
      data: "",
      message: error.message,
    });
  }
};
