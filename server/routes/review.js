const express = require('express');
const router = express.Router({ mergeParams: true });
const { isLoggedIn, validateReview } = require('../middleware.js');
const Review = require('../models/review.js');
const mens = require('../models/mens.js');
const women = require('../models/women.js');
const child = require('../models/child.js');
const ele = require('../models/electric.js');

// Create a review for an item
router.post("/", isLoggedIn, validateReview, async (req, res) => {
    let data = await mens.findById(req.params.id)
        || await women.findById(req.params.id)
        || await child.findById(req.params.id)
        || await ele.findById(req.params.id);

    if (!data) {
        return res.status(404).json({ success: false, message: "Item not found" });
    }

    try {
        let newReview = new Review(req.body.review);
        newReview.author = req.user._id;
        await newReview.save();
        
        data.reviews.push(newReview);
        await data.save();

        return res.status(201).json({
            success: true,
            message: "Review added successfully",
            review: newReview
        });
    } catch (err) {
        console.error("Error adding review:", err);
        return res.status(500).json({
            success: false,
            message: "Error adding review",
            error: err.message
        });
    }
});

// Delete a review
router.delete("/:reviewId", isLoggedIn, validateReview, async (req, res) => {
    const { id, reviewId } = req.params;

    try {
        let data = await mens.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
            || await women.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
            || await child.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
            || await ele.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

        if (!data) {
            return res.status(404).json({ success: false, message: "Item not found" });
        }

        await Review.findByIdAndDelete(reviewId);

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });
    } catch (err) {
        console.error("Error deleting review:", err);
        return res.status(500).json({
            success: false,
            message: "Error deleting review",
            error: err.message
        });
    }
});

module.exports = router;
