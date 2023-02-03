const messageController = require("../controllers/messageController");
const { verifyToken } = require("../controllers/middlewareController");

const router = require("express").Router();

//CREATE NEW CONVERSATION
router.post("/new-message", verifyToken, messageController.createNewMessage)

//GET ALL MESSAGES BY CONVERSATION ID
router.get("/conversation/:id", verifyToken, messageController.getAllMessages)


module.exports = router;