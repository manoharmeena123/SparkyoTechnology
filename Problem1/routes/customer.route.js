const express = require("express");
const { customerGet, customerPost, customerUpdate, customerDelete } = require("../controller/customer.controller");

const customerRouter = express.Router();

customerRouter.get("/", customerGet);
customerRouter.post("/create", customerPost);
customerRouter.patch("/update/:Id", customerUpdate);
customerRouter.delete("/delete/:Id", customerDelete);

module.exports = {
    customerRouter
};
