const express = require("express");
const { deliveryGet, deliveryPost, deliveryUpdate, deliveryDelete } = require("../controller/deliveryVehicles.controller");

const deliveryRouter = express.Router();



deliveryRouter.get("/", deliveryGet);
deliveryRouter.post("/create", deliveryPost);
deliveryRouter.patch("/:id", deliveryUpdate);
deliveryRouter.delete("/:id", deliveryDelete);

module.exports = {
    deliveryRouter
};
