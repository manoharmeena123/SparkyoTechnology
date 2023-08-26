
const mongoose = require('mongoose');

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
    }
});

orderSchema.pre('save', function (next) {
    const order = this;
    // Incremental order number logic goes here
    // Assign price from item
    next();
});

module.exports = mongoose.model('Order', orderSchema);
