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

// GET Contact Page
router.get("/contact", user_controller.contact)

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

// GET User become member
router.get("/join-club", user_controller.join_club_get)

// POST User become member
router.post("/join-club", user_controller.join_club_post)

// GET User become admin
router.get("/become-admin", user_controller.become_admin_get)

// POST User become admin
router.post("/become-admin", user_controller.become_admin_post)

////////////////////
// MESSAGE ROUTES //
////////////////////

// GET Create Message
router.get("/message/create", message_controller.message_create_get)

// POST Create Message
router.post("/message/create", message_controller.message_create_post)

// GET Update Message
router.get("/message/:id/update", message_controller.message_update_get)

// POST Update Message
router.post("/message/:id/update", message_controller.message_update_post)

// POST Delete Message
router.post("/message/:id/delete", message_controller.message_delete_post)

// GET All Message List
router.get("/messages", message_controller.message_list)

module.exports = router;
