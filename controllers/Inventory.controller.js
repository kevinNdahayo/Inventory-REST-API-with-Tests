const Inventory = require('../models/inventory.model');
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.CreateBookInventory = async (req, res) => {
    const { bookTitle, bookAuthor, bookPrice, stockQuantity } = req.body
    // register the inventory
    const inventory = {
        title: bookTitle,
        author: bookAuthor,
        price: bookPrice,
        quantity: stockQuantity
    }
    const registeredInventory = new Inventory(inventory);
    await registeredInventory.save();
    return res.status(201).json({
        message: "Created new Book Inventory",
        inventory: registeredInventory
    })
}

exports.getBookInventory = async (req, res) => {
    // get existing inventory
    const existingInventory = await Inventory.find();

    // return existing inventory
    return res.status(200).json({
        message: "Books in the stock",
        inventory: existingInventory
    })
}

exports.searchBookInventory = async (req, res) => {
    const bookId = req.params.bookId; // Correctly accessing the bookId parameter
    try {
        // Get data using the bookId from parameters
        const inventoryInfo = await Inventory.findById(bookId);

        if (!inventoryInfo) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({
            message: "Searched Book",
            info: inventoryInfo
        });
    } catch (error) {
        console.error("Error searching for book:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


exports.updateBookInventory = async (req, res) => {
    const bookId = req.params.bookId;
    // Get req.body 
    const { bookTitle, bookAuthor, bookPrice, stockQuantity } = req.body;
    // update the book Inventory
    const newBookInventory = {
        title: bookTitle,
        author: bookAuthor,
        price: bookPrice,
        quantity: stockQuantity
    };
    try {
        // Update by ID
        const updateBookInventory = await Inventory.findByIdAndUpdate(bookId, newBookInventory, { new: true });
        if (!updateBookInventory) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(201).json({
            message: "Updated Book Inventory",
            inventory: updateBookInventory
        });
    } catch (error) {
        console.error("Error updating book inventory:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.deleteBookInventory = async (req, res) => {
    try {
        // Get the Id
        const bookId = req.params.bookId;
        // Delete the book inventory by Id
        const deleteBookInventory = await Inventory.findByIdAndDelete(bookId);
        
        if (!deleteBookInventory) {
            return res.status(404).json({ message: "Book not found" });
        }

        return res.status(200).json({
            message: "Book Deleted Successfully",
            inventory: deleteBookInventory
        });
    } catch (error) {
        console.error("Error deleting book inventory:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}