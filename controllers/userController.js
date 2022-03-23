const User = require("../.models/user")
const Message = require("../models/message")

exports.index = function(req,res) {
  res.render("index", {
    title: "Members Only | Home"
  })
}