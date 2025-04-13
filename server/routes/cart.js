const express = require("express");
const cart = require("../models/cart.js");
const User = require("../models/user.js");
const { isLoggedIn } = require("../middleware");
const router = express.Router();

// Add item to cart
router.post("/cart", async (req, res) => {
  try {
    const cloth = new cart(req.body.cloth);
    await cloth.save();
    const user = await User.findById(req.user._id);
    user.cart.push(cloth._id);
    await user.save();
    res.status(201).json({ success: true, message: "Item added to cart!", cloth });
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ success: false, message: "Failed to add item to cart." });
  }
});

// Get all cart items
router.get("/cart", isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart");
    res.status(200).json({ success: true, cartItems: user.cart });
  } catch (err) {
    console.error("Error fetching cart items:", err);
    res.status(500).json({ success: false, message: "Error fetching cart items." });
  }
});

// Get specific cart item by ID
router.get("/cart/:id", async (req, res) => {
  try {
    const clothInfo = await cart.findById(req.params.id);
    if (clothInfo) {
      res.status(200).json({ success: true, clothInfo });
    } else {
      res.status(404).json({ success: false, message: "Item not found" });
    }
  } catch (err) {
    console.error("Error fetching item:", err);
    res.status(500).json({ success: false, message: "Error fetching item." });
  }
});

module.exports = router;
