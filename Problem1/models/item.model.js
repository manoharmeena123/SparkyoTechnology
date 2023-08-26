const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number
});

const ItemModel= mongoose.model('Item', itemSchema);

module.exports ={
    ItemModel
}