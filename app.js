const express = require("express")
const path = require("path")
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

// dotenv setup
require("dotenv").config()
const PORT = process.env.PORT || 3000

// mongoDB & mongoose setup
const mongoDB = process.env.MONGO_DB
mongoose.connect(mongoDB, {
  useNewURLParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection Error:"))

// View Engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")