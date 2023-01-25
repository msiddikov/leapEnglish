const axios = require("axios");

exports.getVideo = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const { ttl, token } = req.body;
    const response = await axios.post(
      `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
      { ttl, token },
      {
        headers: {
          Authorization: `Apisecret ${token}`,
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
