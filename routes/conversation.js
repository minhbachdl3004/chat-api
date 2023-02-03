const conversationController = require("../controllers/conversationController");
const { verifyToken } = require("../controllers/middlewareController");

const router = require("express").Router();

//CREATE NEW CONVERSATION
router.post("/new-conversation", verifyToken, conversationController.createNewConversation)

router.get("/all", verifyToken, conversationController.getAllConversation )

module.exports = router;