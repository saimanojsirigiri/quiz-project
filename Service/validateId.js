const ObjectId = require("mongoose").Types.ObjectId;
const validateDbId = (req, res, next) => {
  if (ObjectId.isValid(req.params.id) === false)
    res.send(400).json({
      error: "given user id is not valid",
    });
  else next();
};

const resolve404Error = (req, res) => {
  res.status(404).json({
    error: "id not found",
  });
};

module.exports = {
  validateDbId,
  resolve404Error,
};
