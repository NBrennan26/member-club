const express = require("express");
const router = express.Router();

// GET Home Page
router.get("/", user_controller.index)

module.exports = router;
