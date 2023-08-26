const express = require("express");
const app = express();
const customerRouter = express.Router();
const { customerGet, customerPost, customerUpdate, customerDelete } = require("../controller/customer.controller");

app.use(express.json());


//Router=========================================>

customerRouter.get("/", customerGet);
customerRouter.post("/create", customerPost);
customerRouter.patch("update/:id", customerUpdate);
customerRouter.delete("delete/:id", customerDelete);

module.exports = {
    customerRouter
}