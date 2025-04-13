const express = require('express');
const router = express.Router();
const ChildClothing = require('../models/child');
const User = require('../models/user');

// Dashboard route - returns user data and items in JSON format
router.get('/dashboard', async (req, res) => {
    if (req.user) {
        try {
            const user = await User.findById(req.user._id);
            const items = await ChildClothing.find({ owner: user._id });

            return res.status(200).json({
                success: true,
                user,
                items
            });
        } catch (err) {
            console.error("Error fetching dashboard data:", err);
            return res.status(500).json({
                success: false,
                message: "Error fetching user data"
            });
        }
    }
    res.status(401).json({
        success: false,
        message: "User not logged in"
    });
});

// Add item route - adds a new child clothing item and returns success or failure in JSON
router.post('/add-item', async (req, res) => {
    const { name, category, price, sizes, color, stock, description, image } = req.body;

    try {
        const newItem = new ChildClothing({
            name,
            category,
            price,
            sizes: sizes.split(',').map(s => s.trim()), // clean split
            color,
            stock,
            description,
            image,
            person: req.user.username,
            owner: req.user._id
        });

        await newItem.save();
        res.status(201).json({
            success: true,
            message: "Item added successfully",
            newItem
        });
    } catch (err) {
        console.error("Error adding item:", err);
        res.status(500).json({
            success: false,
            message: "Failed to add item"
        });
    }
});

module.exports = router;
