const express = require('express');
const mens = require('../models/mens.js');
const women = require('../models/women.js');
const electric = require('../models/electric.js');
const child = require('../models/child.js');
const router = express.Router();

// Search route - stores the category in the session and redirects to search results
router.post("/search", (req, res) => {
    req.session.data = req.body.categories;
    res.status(200).json({
        success: true,
        message: "Category saved successfully, proceeding to search."
    });
});

// Get search results based on the stored category in the session
router.get("/search", async (req, res) => {
    try {
        let cate = req.session.data;
        if (!cate) {
            return res.status(400).json({ success: false, message: "No category selected" });
        }

        let cat = cate.toLowerCase();
        let man = await mens.find({ category: cat }).exec();
        let woman = await women.find({ category: cat }).exec();
        let children = await child.find({ category: cat }).exec();
        let ele = await electric.find({ category: cat }).exec();

        const results = await Promise.all([man, woman, children, ele]);
        const men = [].concat(...results);

        if (men.length === 0) {
            return res.status(404).json({ success: false, message: "No items found for the selected category" });
        }

        return res.status(200).json({
            success: true,
            message: "Search results found",
            items: men
        });
    } catch (err) {
        console.error("Error during search:", err);
        return res.status(500).json({
            success: false,
            message: "An error occurred while searching",
            error: err.message
        });
    }
});

module.exports = router;
