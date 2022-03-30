const User = require("../models/user");
const Message = require("../models/message");

const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Display Home/Default Page
exports.index = function (req, res) {
  res.redirect("/messages")
};

// Display Contact Page
exports.contact = function (req, res) {
  res.render("index", {
    title: "Members Only | Contact",
    view: "contact",
  });
}

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
        throw new Error("Passwords do not match");
      } else {
        return true;
      }
    }),
  body("icon", "").escape(),
  body("member", "").isBoolean().trim().escape(),
  body("admin", "").isBoolean().trim().escape(),

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
      // Data from form is valid
      // Hash password, then create User object with escaped and trimmed data
      bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        let user = new User({
          username: req.body.username,
          password: hashedPassword,
          icon: req.body.icon,
          member: req.body.member,
          admin: req.body.admin,
        });
        user.save(function (err) {
          if (err) {
            if (err._message === "User validation failed") {
              console.log(err._message);
              res.render("index", {
                title: "Members Only | Sign Up",
                user: req.body,
                errors: [{ msg: "Username is already taken" }],
                view: "user_form",
              });
              return;
            }
            if (err && err._message !== "User validation failed") {
              return next(err);
            }
          }
          res.redirect("/log-in");
        });
      });
    }
  },
];

// Display User log-in page
exports.log_in_get = function (req, res) {
  res.render("index", {
    title: "Members Only | Log In",
    user: "",
    errors: "",
    view: "user_login",
  });
};

// Handle User log-in
exports.log_in_post = [
  // Validate and Sanitize fields
  body("username", "Username is required.")
    .trim()
    .isLength({ min: 1, max: 30 })
    .escape(),
  body("password", "Password is required.")
    .trim()
    .isLength({ min: 5, max: 40 })
    .escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("/index", {
        title: "Members Only | Log In",
        user: req.body,
        errors: errors.array(),
        view: "user_login",
      });
    }
    next();
  },
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  }),
];

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

// Display form to become member
exports.join_club_get = function (req, res) {
  res.render("index", {
    title: "Members Only | Join Club",
    errors: "",
    view: "user_member",
  });
};

// Handle User join club on submit
exports.join_club_post = [
  // Validate and Sanitize fields
  body("member_code", "Invalid Member Code")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .custom((val, { req }) => {
      if (val !== process.env.MEMBER_CODE) {
        throw new Error("Invalid Member Code");
      } else {
        return true;
      }
    }),

  // Process Request after Validation & Sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages
      res.render("index", {
        title: "Members Only | Join Club",
        errors: errors.array(),
        view: "user_member",
      });
      return;
    } else {
      // Data from form is valid
      console.log(req.user);
      User.findByIdAndUpdate(req.user._id, { member: true }, (err, user) => {
        if (err) {
          return next(err);
        } else {
          res.redirect("/join-club");
        }
      });
    }
  },
];

// Display form to become admin
exports.become_admin_get = function (req, res) {
  res.render("index", {
    title: "Members Only | Become Admin",
    errors: "",
    view: "user_admin",
  });
};

// Handle User become admin on submit
exports.become_admin_post = [
  // Validate and Sanitize fields
  body("admin_code", "Invalid Admin Code")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .custom((val, { req }) => {
      if (val !== process.env.ADMIN_CODE) {
        throw new Error("Invalid Admin Code");
      } else {
        return true;
      }
    }),

  // Process Request after Validation & Sanitization
  (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages
      res.render("index", {
        title: "Members Only | Join Admin",
        errors: errors.array(),
        view: "user_admin",
      });
      return;
    } else {
      // Data from form is valid
      console.log(req.user);
      User.findByIdAndUpdate(
        req.user._id,
        { member: true, admin: true },
        (err, user) => {
          if (err) {
            return next(err);
          } else {
            res.redirect("/become-admin");
          }
        }
      );
    }
  },
];
