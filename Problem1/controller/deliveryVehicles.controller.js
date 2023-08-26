const { DeliveryVehicleModel } = require("../models/deliveryVehicles.model");



//Get All=============================================================>
const deliveryGet = async (req, res) => {
    try {
        const deliveryVehicles = await DeliveryVehicleModel.find();
        res.json(deliveryVehicles);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


//Post  =============================================================>
const deliveryPost = async (req, res) => {
    try {
        const newDeliveryVehicle = new DeliveryVehicleModel(req.body);
        await newDeliveryVehicle.save();
        res.status(201).json({ message: "Delivery vehicle created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

//Update  =============================================================>
const deliveryUpdate = async (req, res) => {
    const deliveryId = req.params.id;
    try {
        await DeliveryVehicleModel.findByIdAndUpdate(deliveryId, req.body);
        res.json({ message: "Delivery vehicle updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};
//Delete  =============================================================>
const deliveryDelete = async (req, res) => {
    const deliveryId = req.params.id;
    try {
        await DeliveryVehicleModel.findByIdAndDelete(deliveryId);
        res.json({ message: "Delivery vehicle deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    deliveryGet,
    deliveryPost,
    deliveryUpdate,
    deliveryDelete
};
