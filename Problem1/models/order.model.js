const mongoose = require('mongoose');
const { ItemModel } = require('./item.model'); 

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        unique: true
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    price: {
        type: Number
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    deliveryVehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryVehicle'
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    invoice: {
        customerName: String,
        itemName: String,
        price: Number
    }
});

orderSchema.pre('save', async function (next) {
    const order = this;

    // Incremental order number logic
    try {
        const lastOrder = await OrderModel.findOne({}, {}, { sort: { 'orderNumber': -1 } });
        if (lastOrder) {
            const lastOrderNumber = parseInt(lastOrder.orderNumber, 10);
            order.orderNumber = (lastOrderNumber + 1).toString().padStart(4, '0');
        } else {
            order.orderNumber = '0001';
        }
    } catch (error) {
        return next(error);
    }

    // Assign price from item
    try {
        const item = await ItemModel.findById(order.itemId);
        if (!item) {
            throw new Error("Item not found");
        }
        order.price = item.price;
    } catch (error) {
        return next(error);
    }

    // Invoicing logic
    if (order.isDelivered) {
        const customer = await CustomerModel.findById(order.customerId);

        if (!customer) {
            return next(new Error("Customer not found"));
        }
        const invoice = {
            customerName: customer.name,
            itemName: item.name, 
            price: order.price
        };
        order.invoice = invoice;
    }

    next();
});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = {
    OrderModel
};
