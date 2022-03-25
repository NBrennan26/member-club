const express = require("express");
const path = require("path");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const helmet = require("helmet");

const router = require("./routes/index");
const User = require("./models/user");

// dotenv setup
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// mongoDB & mongoose setup
const mongoDB = process.env.MONGO_DB;
mongoose.connect(mongoDB, {
  useNewURLParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection Error:"));

// Express Application Object
const app = express();

// View Engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Passport
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: {"$regex": username, $options: "i" }}, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect Username" });
      }

      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // Passwords Match - Log User in
          return done(null, user);
        } else {
          // No Password Match
          return done(null, false, { message: "Incorrect Password" });
        }
      });
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());

app.use(express.static(path.join(__dirname, "public")));

// Create currentUser variable (accessible in all views)
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", router);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
