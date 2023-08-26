const express = require("express");
const { itemGet, itemPost, itemUpdate, itemDelete } = require("../controller/item.controller");

const itemRouter = express.Router();

itemRouter.get("/", itemGet);
itemRouter.post("/create", itemPost);
itemRouter.patch("/:itemId", itemUpdate);
itemRouter.delete("/:itemId", itemDelete);

module.exports = {
    itemRouter
};
