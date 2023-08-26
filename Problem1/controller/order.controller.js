const { OrderModel } = require("../models/order.model");



//Get All=============================================================>
const orderGet = async (req, res) => {
    try {
        const orders = await OrderModel.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


//Post  =============================================================>
const orderPost = async (req, res) => {
    try {
        const newOrder = new OrderModel(req.body);
        await newOrder.save();
        res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

//Update  =============================================================>
const orderUpdate = async (req, res) => {
    const orderId = req.params.id;
    try {
        await OrderModel.findByIdAndUpdate(orderId, req.body);
        res.json({ message: "Order updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

//Delete  =============================================================>
const orderDelete = async (req, res) => {
    const orderId = req.params.id;
    try {
        await OrderModel.findByIdAndDelete(orderId);
        res.json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    orderGet,
    orderPost,
    orderUpdate,
    orderDelete
};
