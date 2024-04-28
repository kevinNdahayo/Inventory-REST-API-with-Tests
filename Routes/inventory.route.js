const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/Inventory.controller');
const middlewareToken = require('../utils/jwt.middleware');

const getInventory = router.get('/', middlewareToken, inventoryController.getBookInventory);
const searchInventory = router.get('/:bookId', middlewareToken, inventoryController.searchBookInventory);
const postInventory = router.post('/register', middlewareToken, inventoryController.CreateBookInventory);
const updateInventory = router.put('/update/:bookId', middlewareToken, inventoryController.updateBookInventory);
const deleteInventory = router.delete('/delete/:bookId', middlewareToken, inventoryController.deleteBookInventory);

module.exports = { getInventory, searchInventory, postInventory, updateInventory, deleteInventory }