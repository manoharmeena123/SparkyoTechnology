const express = require("express");
const { itemGet, itemPost, itemUpdate, itemDelete } = require("../controller/item.controller");

const itemRouter = express.Router();

itemRouter.get("/", itemGet);
itemRouter.post("/create", itemPost);
itemRouter.patch("/update/:itemId", itemUpdate);
itemRouter.delete("/delete/:itemId", itemDelete);

module.exports = {
    itemRouter
};
