const mongoose = require('mongoose');

const bookInventorySchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    quantity: Number
})

const Inventory = new mongoose.model("Inventory", bookInventorySchema);

module.exports = Inventory;