const express = require("express");
const router = express.Router();

// Require controller modules
const user_controller = require("../controllers/userController")
const message_controller = require("../controllers/messageController")

///////////////////
// DEFAULT ROUTE //
///////////////////

// GET Home Page
router.get("/", user_controller.index)

/////////////////
// USER ROUTES //
/////////////////

// GET User Sign-Up 
router.get("/sign-up", user_controller.sign_up_get)

// POST User Sign-Up 
router.post("/sign-up", user_controller.sign_up_post)

// GET User Log-In
router.get("/log-in", user_controller.log_in_get)

// POST User Log-In
router.post("/log-in", user_controller.log_in_post)

// GET User Log-Out
router.get("/log-out", user_controller.log_out)

// GET User Details
router.get("/user/:id", user_controller.user_details)

// GET Update User Details
router.get("/user/:id/update", user_controller.user_update_get)

// POST Update User Details
router.post("/user/:id/update", user_controller.user_update_post)

// GET All User List
router.get("/users", user_controller.user_list)

////////////////////
// MESSAGE ROUTES //
////////////////////

// GET Create Message
router.get("message/create", message_controller.message_create_get)

// POST Create Message
router.post("message/create", message_controller.message_create_post)

// GET Message Details
router.get("message/:id", message_controller.message_details)

// GET Update Message
router.get("message/:id/update", message_controller.message_update_get)

// POST Update Message
router.post("message/:id/update", message_controller.message_update_post)

// GET Delete Message
router.get("message/:id/delete", message_controller.message_delete_get)

// POST Delete Message
router.post("message/:id/delete", message_controller.message_delete_post)

// GET All Message List
router.get("messages", message_controller.message_list)

module.exports = router;
