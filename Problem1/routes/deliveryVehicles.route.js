const express = require("express");
const app = express();
const deliveryRouter = express.Router();
const { deliveryGet, deliveryPost, deliveryUpdate, deliveryDelete } = require("../controller/deliveryVehicles.controller");

app.use(express.json());


//Router=========================================>

deliveryRouter.get("/", deliveryGet);
deliveryRouter.post("/create", deliveryPost);
deliveryRouter.patch("update/:id", deliveryUpdate);
deliveryRouter.delete("delete/:id", deliveryDelete);

module.exports = {
    deliveryRouter
}