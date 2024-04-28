const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;

const { createUserAuthRoute, loginUserAuthRoute, updateUserAuthRoute, deleteUserAuthRoute } = require('./Routes/auth.route');
const { getInventory, searchInventory, postInventory, updateInventory, deleteInventory } = require('./Routes/inventory.route');

// Body Parsing
app.use(express.json());

// AuthRoutes
app.use('/auth', createUserAuthRoute)
app.use('/auth', loginUserAuthRoute)
app.use('/auth', updateUserAuthRoute)
app.use('/auth', deleteUserAuthRoute)


// InventoryRoutes
app.use('/books', getInventory);
app.use('/books', searchInventory);
app.use ('/books', postInventory);
app.use('/books', updateInventory);
app.use('/books', deleteInventory);

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_DB_LINK)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const server = app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`)
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
    } else {
        console.error('An error occurred while starting the server:', err);
    }
});
module.exports = app;