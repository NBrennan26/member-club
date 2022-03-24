const User = require("../models/user");
const Message = require("../models/message");

// Display Home/Default Page
exports.index = function (req, res) {
  res.render("index", {
    title: "Members Only | Home",
    view: "home",
  });
};

// Display User sign-up form
exports.sign_up_get = function (req, res) {
  res.render("index", {
    title: "Members Only | Sign Up",
    view: "user_form",
  });
};

// Handle User sign-up on POST
exports.sign_up_post = function (req, res) {
  res.render("index", {
    title: "Members Only | Sign Up",
    view: "user_form",
  });
};

// Display User log-in page
exports.log_in_get = function (req, res) {
  res.render("index", {
    title: "Members Only | Log In",
    view: "user_login",
  });
};

// Handle User log-in
exports.log_in_post = function (req, res) {
  res.render("index", {
    title: "Members Only | Log In",
    view: "user_login",
  });
};

// Handle User log-out
exports.log_out = function (req, res) {
  req.logOut();
  res.redirect("/");
};

// Display details of a specific User
exports.user_details = function (req, res) {
  res.render("index", {
    title: "Members Only | User Details",
    view: "user_detail",
  });
};

// Display form to update User details
exports.user_update_get = function (req, res) {
  res.render("index", {
    title: "Members Only | Update User",
    view: "user_form",
  });
};

// Handle update User details
exports.user_update_post = function (req, res) {
  res.render("index", {
    title: "Members Only | Update User",
    view: "user_form",
  });
};

// Display list of all Users
exports.user_list = function (req, res) {
  res.render("index", {
    title: "Members Only | All Users",
    view: "user_list",
  });
};
