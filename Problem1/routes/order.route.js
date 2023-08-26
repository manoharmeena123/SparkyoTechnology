const express = require("express");
const app = express();
const orderRouter = express.Router();
const { orderGet, orderPost, orderUpdate, orderDelete } = require("../controller/order.controller");

app.use(express.json());


//Router=========================================>

orderRouter.get("/", orderGet);
orderRouter.post("/create", orderPost);
orderRouter.patch("update/:id", orderUpdate);
orderRouter.delete("delete/:id", orderDelete);

module.exports = {
    orderRouter
}