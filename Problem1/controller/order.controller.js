const { OrderModel } = require("../models/order.model");
const { logger } = require("../middleware/logger");

// Get All =============================================================>
const orderGet = async (req, res) => {
    try {
        const orders = await OrderModel.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Post =============================================================>
const orderPost = async (req, res) => {
    try {
        const newOrder = new OrderModel(req.body);
        await newOrder.save();
        res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


// Update (including Invoicing) =====================================>
const orderUpdate = async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await OrderModel.findById(orderId).populate("customerId itemId");
        
        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }
        if (order.isDelivered) {
            return res.status(400).json({ error: "Order is already marked as delivered" });
        }

        // Mark the order as delivered
        order.isDelivered = true;
        await order.save();

        // Generate invoice
        const invoice = {
            customerName: order.customerId.name,
            itemName: order.itemId.name,
            price: order.price,
            invoiceId: "INV-" + Math.floor(Math.random() * 10000) // Generate a unique invoice ID here
        };

        // Update order with invoiceId
        order.invoiceId = invoice.invoiceId;
        await order.save();

        logger.info(`Order ${order.orderNumber} marked as delivered. Invoice generated: ${invoice.invoiceId}`);

        res.json({ message: "Order marked as delivered. Invoice generated.", invoice });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Delete  =============================================================>
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
