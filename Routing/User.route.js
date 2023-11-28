const express = require("express");

const route = express.Router();
const createError = require("http-errors");
const user = require("../Database/User.Database");

const { generateCrudOperations } = require("../Service/crudOperations");
const userCrud = generateCrudOperations(user);
const { validateDbId, resolve404Error } = require("../Service/validateId");

route.get("/fetchAllUsers", async (req, res, next) => {
  userCrud
    .getAll()
    .then((data) => res.send(data))
    .catch((err) => next(err));
});

route.get("/:id", validateDbId, async (req, res, next) => {
  userCrud
    .getById(req.params.id)
    .then((data) => {
      console.log(data);
      if (data) {
        res.send(data);
      } else {
        resolve404Error(req, res);
      }
    })
    .catch((err) => next(err));
});

route.post("/addUser", async (req, res, next) => {
  userCrud
    .create(req.body)
    .then((data) => {
      if (data) res.send(data);
      else resolve404Error(req, res);
    })
    .catch((err) => next(err));
});

route.put("/updateUser/:id", validateDbId, async (req, res, next) => {
  userCrud
    .update(req.params.id, req.body)
    .then((data) => {
      if (data) res.send(data);
      else resolve404Error(req, res);
    })
    .catch((err) => next(err));
});

route.delete("/deleteUser/:id", validateDbId, async (req, res, next) => {
  userCrud
    .delete(req.params.id)
    .then(res.send("user deleted successfully"))
    .catch((err) => next(err));
});

module.exports = route;
