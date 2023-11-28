const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
require("dotenv").config();
require("./helper/init_mongodb");

const route = require("./Routing/User.route");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res, next) => {
  res.send("Hello");
});

app.use("/user", route);

app.use(async (req, res, next) => {
  next(createError.NotFound(`Url doesn't exist`));
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: "User details already exist",
    },
  });
  console.log(err);
});

const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
