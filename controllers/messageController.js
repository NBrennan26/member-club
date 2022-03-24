const User = require("../models/user");
const Message = require("../models/message");

// Display create Message form
exports.message_create_get = function(req, res) {
  res.render("index", {
    title: "Members Only | New Message",
    view: "message_form"
  })
}

// Handle create new Message on POST
exports.message_create_post = function(req, res) {
  res.render("index", {
    title: "Members Only | New Message",
    view: "message_form"
  })
}

// Display details of a specific Message
exports.message_details = function(req, res) {
  res.render("index", {
    title: "Members Only | Message Details",
    view: "message_detail"
  })
}

// Display form to update a specific Message
exports.message_update_get = function(req, res) {
  res.render("index", {
    title: "Members Only | Update Message",
    view: "message_form"
  })
}

// Handle update Message on POST
exports.message_update_post = function(req, res) {
  res.render("index", {
    title: "Members Only | Update Message",
    view: "message_form"
  })
}

// Display form to delete a specific Message
exports.message_delete_get = function(req, res) {
  res.render("index", {
    title: "Members Only | Delete Message",
    view: "message_delete"
  })
}

// Handle delete Message on POST
exports.message_delete_post = function(req, res) {
  res.render("index", {
    title: "Members Only | Delete Message",
    view: "message_delete"
  })
}

// Display list of all Messages
exports.message_list = function(req, res) {
  res.render("index", {
    title: "Members Only | All Messages",
    view: "message_list"
  })
}
