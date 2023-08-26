const express = require("express");
const { orderGet, orderPost, orderUpdate, orderDelete } = require("../controller/order.controller");

const orderRouter = express.Router();

orderRouter.get("/", orderGet);
orderRouter.post("/create", orderPost);
orderRouter.patch("/:id", orderUpdate);
orderRouter.delete("/:id", orderDelete);

module.exports = {
    orderRouter
};
