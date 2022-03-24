const express = require("express");
const router = express.Router();

// Require controller modules
const user_controller = require("../controllers/userController")
const message_controller = require("../controllers/messageController")

// GET Home Page
router.get("/", user_controller.index)



module.exports = router;
