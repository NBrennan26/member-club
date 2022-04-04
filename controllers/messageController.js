const User = require("../models/user");
const Message = require("../models/message");

const { body, validationResult } = require("express-validator");

// Display create Message form
exports.message_create_get = function (req, res) {
  res.render("index", {
    title: "Members Only | New Message",
    user: req.user,
    message: "",
    errors: "",
    view: "message_form",
  });
};

// Handle create new Message on POST
exports.message_create_post = [
  // Validate and Sanitize Fields
  body("title")
    .trim()
    .isLength({ max: 140 })
    .escape()
    .withMessage("Title is required and must be less than 140 characters"),
  body("content")
    .trim()
    .isLength({ max: 280 })
    .escape()
    .withMessage("Content is required and must be less than 280 characters"),
  body("user").trim().escape(),

  // Process request after Validation and Sanitization
  (req, res, next) => {
    // Extract Validation Errors from the Request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are Errors. Render Again
      res.render("index", {
        title: "Members Only | New Message",
        user: req.user,
        message: req.body,
        errors: errors.array(),
        view: "message_form",
      });
      return;
    } else {
      // Data is Valid, no Errors
      // Create new Message object
      let message = new Message({
        title: req.body.title,
        content: req.body.content,
        timestamp: Date.now(),
        user: req.body.user,
      });
      message.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect("/messages");
      });
    }
  },
];

// Display details of a specific Message
exports.message_details = function (req, res) {
  res.render("index", {
    title: "Members Only | Message Details",
    view: "message_detail",
  });
};

// Display form to update a specific Message
exports.message_update_get = function (req, res, next) {
  Message.findById(req.params.id).exec(function (err, message) {
    if (err) {
      return next(err);
    }
    if (message == null) {
      // No Message Found
      let err = new Error("Message Not Found");
      err.status = 404;
      return next(err);
    }
    // Successful, so Render
    console.log("Message is there.")
    res.render("index", {
      title: "Members Only | Edit Message",
      user: req.user,
      message,
      errors: "",
      view: "message_form",
    });
  });
};

// Handle update Message on POST
exports.message_update_post = function (req, res) {
  res.render("index", {
    title: "Members Only | Update Message",
    view: "message_form",
  });
};

// Display form to delete a specific Message
exports.message_delete_get = function (req, res) {
  res.render("index", {
    title: "Members Only | Delete Message",
    view: "message_delete",
  });
};

// Handle delete Message on POST
exports.message_delete_post = function (req, res) {
  Message.findByIdAndRemove(req.params.id, function deleteMessage(err) {
    if (err) {
      return next(err);
    }
    // Success - Redirect back to message list
    res.redirect("/messages");
  });
};

// Display list of all Messages
exports.message_list = function (req, res) {
  Message.find()
    .sort([["timestamp", "descending"]])
    .populate("user")
    .exec(function (err, list_messages) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render("index", {
        title: "Members Only | All Messages",
        message_list: list_messages,
        view: "message_list",
      });
    });
};
