const { ItemModel } = require("../models/item.model");



//Get All=============================================================>
const itemGet = async (req, res) => {
    try {
        const items = await ItemModel.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


//Post  =============================================================>
const itemPost = async (req, res) => {
    try {
        const newItem = new ItemModel(req.body);
        await newItem.save();
        res.status(201).json({ message: "Item created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

//Update  =============================================================>
const itemUpdate = async (req, res) => {
    const itemId = req.params.itemId;
    try {
        await ItemModel.findByIdAndUpdate(itemId, req.body);
        res.json({ message: "Item updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

//Delete  =============================================================>
const itemDelete = async (req, res) => {
    const itemId = req.params.itemId;
    try {
        await ItemModel.findByIdAndDelete(itemId);
        res.json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    itemGet,
    itemPost,
    itemUpdate,
    itemDelete
};
