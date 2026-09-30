const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    data: null,
    message: "Something went wrong. Please try again later.",
    error: {
      code: "INTERNAL_SERVER_ERROR",
      details: null
    }
  });
};

module.exports = errorHandler;
