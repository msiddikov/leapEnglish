const axios = require("axios");

exports.getVideo = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const response = await axios.post(
      `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
      { ttl: 300 },
      {
        headers: {
          Authorization: `Apisecret kHhUHc9PDE1lutYrg540YSQDYKONc2exVqeC9LLno4dKRbZrd0zS6t7VAvdl3aMm`,
        },
      }
    );

    res.status(200).json({
      data: response.data,
      isOk: true,
      message: "you success get video options",
    });
  } catch (error) {
    res.status(404).json({ data: "", isOk: false, message: error.message });
  }
};
