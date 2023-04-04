const messageController = require("../controllers/messageController");
const { verifyToken } = require("../controllers/middlewareController");
const multer = require("multer");
const fs = require("fs");

function generateId() {
  const min = 1000000000000; // smallest 19-digit number
  const max = 9999999999999; // largest 19-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const userId = req.body.senderId;
    const dest = `uploads/attachments/${userId}/`;
    if (!fs.existsSync(dest)) {
      fs.mkdir(dest, { recursive: true });
    }
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    console.log(req.body.senderId);
    cb(null, generateId() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
})

const router = require("express").Router();

//CREATE NEW CONVERSATION
router.post(
  "/new-message",
  verifyToken,
  upload.array('images'),
  messageController.createNewMessage
);

//GET ALL MESSAGES BY CONVERSATION ID
router.get("/conversation/:id", verifyToken, messageController.getAllMessages);

//DELTE MESSAGE BY ID
router.delete("/delete/", verifyToken, messageController.deleteMessageById);

module.exports = router;
