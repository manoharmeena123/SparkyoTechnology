const { CustomerModel } = require("../models/customer.model");


//Get All=============================================================>
const customerGet = async (req, res) => {
    try {
        const customers = await CustomerModel.find();
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};




//Post  =============================================================>
const customerPost = async (req, res) => {
    try {
        const newCustomer = new CustomerModel(req.body);
        await newCustomer.save();
        res.status(201).json({ message: "Customer created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};



//Update  =============================================================>
const customerUpdate = async(req, res) => {
    const Id = req.params.Id;
    const payload = req.body
    try {
        await CustomerModel.findByIdAndUpdate({ _id:Id }, payload);
        res.json({ message: "Customer updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

//Delete  =============================================================>
const customerDelete = async (req, res) => {
    const Id = req.params.Id;
    try {
        await CustomerModel.findByIdAndDelete({_id : Id});
        res.json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    customerGet,
    customerPost,
    customerUpdate,
    customerDelete
};
