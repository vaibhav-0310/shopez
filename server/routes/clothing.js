const express = require("express");
const mens = require("../models/mens.js");
const women = require("../models/women.js");
const child = require("../models/child.js");
const router = express.Router({ mergeParams: true });

// === MEN CLOTHING ===
router.get("/men", async (req, res) => {
  try {
    const menClothes = await mens.find({});
    res.status(200).json({ success: true, items: menClothes });
  } catch (err) {
    console.error("Error fetching men's clothing:", err);
    res.status(500).json({ success: false, message: "Error fetching men's clothing" });
  }
});

router.get("/men/:id", async (req, res) => {
  try {
    const clothInfo = await mens.findById(req.params.id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .populate("owner");

    if (clothInfo) {
      res.status(200).json({ success: true, item: clothInfo });
    } else {
      res.status(404).json({ success: false, message: "Item not found" });
    }
  } catch (err) {
    console.error("Error fetching men's item:", err);
    res.status(500).json({ success: false, message: "Error fetching item" });
  }
});

// === WOMEN CLOTHING ===
router.get("/women", async (req, res) => {
  try {
    const womenClothes = await women.find({});
    res.status(200).json({ success: true, items: womenClothes });
  } catch (err) {
    console.error("Error fetching women's clothing:", err);
    res.status(500).json({ success: false, message: "Error fetching women's clothing" });
  }
});

router.get("/women/:id", async (req, res) => {
  try {
    const clothInfo = await women.findById(req.params.id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .populate("owner");

    if (clothInfo) {
      res.status(200).json({ success: true, item: clothInfo });
    } else {
      res.status(404).json({ success: false, message: "Item not found" });
    }
  } catch (err) {
    console.error("Error fetching women's item:", err);
    res.status(500).json({ success: false, message: "Error fetching item" });
  }
});

// === CHILDREN CLOTHING ===
router.get("/children", async (req, res) => {
  try {
    const childClothes = await child.find({});
    res.status(200).json({ success: true, items: childClothes });
  } catch (err) {
    console.error("Error fetching children's clothing:", err);
    res.status(500).json({ success: false, message: "Error fetching children's clothing" });
  }
});

router.get("/children/:id", async (req, res) => {
  try {
    const clothInfo = await child.findById(req.params.id)
      .populate({
        path: "reviews",
        populate: { path: "author" },
      })
      .populate("owner");

    if (clothInfo) {
      res.status(200).json({ success: true, item: clothInfo });
    } else {
      res.status(404).json({ success: false, message: "Item not found" });
    }
  } catch (err) {
    console.error("Error fetching children's item:", err);
    res.status(500).json({ success: false, message: "Error fetching item" });
  }
});

module.exports = router;
