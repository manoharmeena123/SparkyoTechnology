const express = require("express");
const { customerGet, customerPost, customerUpdate, customerDelete } = require("../controller/customer.controller");

const customerRouter = express.Router();

customerRouter.get("/", customerGet);
customerRouter.post("/create", customerPost);
customerRouter.patch("/:id", customerUpdate);
customerRouter.delete("/:id", customerDelete);

module.exports = {
    customerRouter
};
