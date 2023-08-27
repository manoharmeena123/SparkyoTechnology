const express = require("express");
const { deliveryGet, deliveryPost, deliveryUpdate, deliveryDelete } = require("../controller/deliveryVehicles.controller");

const deliveryRouter = express.Router();



deliveryRouter.get("/", deliveryGet);
deliveryRouter.post("/create", deliveryPost);
deliveryRouter.patch("/update/:id", deliveryUpdate);
deliveryRouter.delete("/delete/:id", deliveryDelete);

module.exports = {
    deliveryRouter
};
