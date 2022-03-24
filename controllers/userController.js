const User = require("../models/user");
const Message = require("../models/message");

const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

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
    user: "",
    errors: "",
    view: "user_form",
  });
};

// Handle User sign-up on POST
exports.sign_up_post = [
  // Validate and Sanitize fields
  body("first_name", "First Name is required and can be 30 characters max.")
    .trim()
    .isLength({ min: 1, max: 30 })
    .escape(),
  body("last_name", "Last Name is required and can be 30 characters max.")
    .trim()
    .isLength({ min: 1, max: 30 })
    .escape(),
  body("username", "Username is required and can be 30 characters max.")
    .trim()
    .isLength({ min: 1, max: 30 })
    .escape(),
  body(
    "password",
    "Password is required and must be between 5 & 40 characters."
  )
    .trim()
    .isLength({ min: 5, max: 40 })
    .escape(),
  body("confirm_password", "Passwords must Match")
    .trim()
    .isLength({ min: 5, max: 40 })
    .escape()
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error("Passwords do not match")
      } else { return true }
    }),
  body("member_status", "").trim().escape(),

  // Process Request after Validation & Sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages
      res.render("index", {
        title: "Members Only | Sign Up",
        user: req.body,
        errors: errors.array(),
        view: "user_form",
      });
      return;
    } else {
      // Data from form is valid, check password match
      

      // Hash password, then create User object with escaped and trimmed data
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        let user = new User({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          username: req.body.username,
          password: hashedPassword,
          member_status: req.body.member,
        });
        user.save(function (err) {
          if (err) {
            res.render("index", {
              title: "Members Only | Sign Up",
              user: req.body,
              errors: [{ msg:"Username is already taken" }],
              view: "user_form",
            });
            return;
          }
          res.redirect(user.url);
        });
      });
    }
  },
];

// Display User log-in page
exports.log_in_get = function (req, res) {
  res.render("index", {
    title: "Members Only | Log In",
    view: "user_login",
  });
};

// Handle User log-in
exports.log_in_post = function (req, res) {
  // Validate and Sanitize fields
  body("username", "Username is required.")
    .trim()
    .isLength({ min: 1, max: 30 })
    .escape(),
    body("password", "Password is required.")
      .trim()
      .isLength({ min: 5, max: 40 })
      .escape(),
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/",
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
