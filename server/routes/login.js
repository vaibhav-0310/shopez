const express = require('express');
const User = require('../models/user.js');
const passport = require('passport');
const router = express.Router();

// Sign-up route - returns JSON response instead of rendering EJS view
router.post("/signup", async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const user = new User({ username, email, role });
        const reg = await User.register(user, password);

        req.login(reg, (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: "Login failed during signup" });
            }

            res.status(201).json({
                success: true,
                message: "Signup and login successful",
                user: reg
            });
        });
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).json({ success: false, message: "Error registering user", error: err.message });
    }
});

// Login route - returns JSON response
router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
}), (req, res) => {
    res.status(200).json({
        success: true,
        message: "Login successful",
        user: req.user
    });
});

// Logout route - returns JSON response
router.get("/logout", (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
    });
    res.status(200).json({
        success: true,
        message: "Logout successful"
    });
});

module.exports = router;
