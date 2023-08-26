const express = require("express");
const app = express();
const itemRouter = express.Router();
const { itemGet, itemPost, itemUpdate, itemDelete } = require("../controller/item.controller");

app.use(express.json());


//Router=========================================>

itemRouter.get("/", itemGet);
itemRouter.post("/create", itemPost);
itemRouter.patch("update/:itemId", itemUpdate);
itemRouter.delete("delete/:itemId", itemDelete);

module.exports ={
    itemRouter
}