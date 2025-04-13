require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const ejsmate = require("ejs-mate");
const mongoose = require("mongoose");
const electric = require("./models/electric.js");
const User = require("./models/user.js");
const methodOveride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local");
const multer = require("multer");
const cart = require("./models/cart.js");
const clothing = require("./routes/clothing.js");
const dashboard = require("./routes/dashboard.js");
const login = require("./routes/login.js");
const search = require("./routes/search.js");
const carte = require("./routes/cart.js");
const reviewrouter = require("./routes/review.js");
const flash = require("connect-flash");
const Google = require("passport-google-oauth20");
const cors=require("cors");


//middleware
app.use(cors({
   origin:"http://localhost5173",
   credentials:true
}));
app.use(methodOveride("_method"));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//database connection 
async function main() {
   await mongoose.connect(process.env.ATLASDB_URL);
}
main()
   .then(() => {
      console.log("connected to db");
   })
   .catch((err) => {
      console.log(err);
   });

app.use(session({
   secret: "KiraStorage",
   resave: false,
   saveUninitialized: true,
   cookie: {
       expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
       maxAge: 7 * 24 * 60 * 60 * 1000,
       httpOnly: true,
   }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new Google({
   clientID: process.env.CLIENTID,
   clientSecret: process.env.CLIENT_SECRET,
   callbackURL: "http://localhost:8080/auth/google/callback",
},
   (accessToken, refreshToken, profile, done) => {
      return done(null, profile)
   }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(flash());

//local variable
app.use(async (req, res, next) => {
   if (req.isAuthenticated()) {
      const user = await User.findById(req.user._id);
      res.locals.items = user.cart.length;
   } else {
      res.locals.items = 0;
   }
   res.locals.currUser = req.user;
   res.locals.success = req.flash("success");
   res.locals.error = req.flash("error");
   next();
});

//routes
app.use("/clothing", clothing);
app.use(login);
app.use(dashboard);
app.use(search);
app.use(carte);
app.use("/listings/:id/review", reviewrouter);

// Home Route - Sends JSON response instead of rendering EJS
app.get("/home", async (req, res) => {
   res.json({ message: "Welcome to the home page" });
});

// Default Route
app.get("/", (req, res) => {
   res.redirect("/home");
});

// Electronics Route
app.get("/electronics", async (req, res) => {
   let ele = await electric.find({});
   res.json({ success: true, items: ele });
});

// Clothing Item Route (Electric Example)
app.get("/clothing/electronics/:id", async (req, res) => {
   let id = req.params.id;
   let clothInfo = await electric.findById(id)
      .populate({
         path: "reviews",
         populate: { path: "author" }
      })
      .populate("owner");

   if (clothInfo) {
      res.json({ success: true, item: clothInfo });
   } else {
      res.status(400).json({ success: false, message: "Item not found" });
   }
});

// Delete Cart Item Route (Responds with JSON)
app.delete("/delete/cart", async (req, res) => {
   let id = req.body.id;
   try {
      await cart.findByIdAndDelete(id);
      if (req.isAuthenticated()) {
         await User.findByIdAndUpdate(req.user._id, { $pull: { cart: id } });
      }
      req.flash("success", "Item removed from cart!!");
      res.json({ success: true, message: "Item removed from cart" });
   } catch (error) {
      console.error("Error deleting item:", error);
      res.status(500).json({ success: false, message: "An error occurred while trying to delete the item." });
   }
});

// Google Login Routes
app.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
   "/auth/google/callback",
   passport.authenticate('google', { failureRedirect: '/home' }),
   async (req, res) => {
      const googleProfile = req.user;
      const username = googleProfile.displayName;
      const email = googleProfile.emails[0].value;

      let user = await User.findOne({ email });
      if (!user) {
         user = new User({
            username,
            email,
            cart: [],
         });
         await user.save();
      }
      req.login(user, (err) => {
         if (err) return next(err);
         res.json({ success: true, message: "Login successful", user });
      });
   }
);

// Start Server
app.listen(8080, () => {
   console.log("Server started on port 8080");
});

// Catch-All Route (For invalid routes)
app.get("*", (req, res) => {
   res.status(404).json({ success: false, message: "Page not found" });
});
