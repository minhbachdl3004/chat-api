const {
  verifyToken,
  verifyTokenAndUserAuthorization,
} = require("../controllers/middlewareController");
const userController = require("../controllers/userController");
const router = require("express").Router();
const uploadController = require("../controllers/uploadController");
const multer = require('multer');
const fs = require('fs');

function generateId() {
  const min = 1000000000000; // smallest 19-digit number
  const max = 9999999999999; // largest 19-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const userId = req.body.userId;
    const dest = `uploads/avatar/${userId}/`;
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    cb(null, dest);
  },
  filename: function(req, file, cb) {
    console.log(req.body.userId)
    cb(null, generateId() + '_' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

// GET ALL USERS
router.get("/", verifyToken, userController.getAllUsers);

// GET USER BY USERNAME AND USERNAMEID OR USERID
router.get("/search", verifyToken, userController.getUserByUsername)

// GET USER BY ID
router.get("/search/id", verifyToken, userController.getUserByUserID)

// DELETE USER
router.delete("/:id", verifyTokenAndUserAuthorization, userController.deleteUser);

// PROMOTE TO ADMIN
router.post("/admin/:id", userController.promoteToAdmin)

router.put("/avatar/update", verifyToken, upload.single('avatar'), uploadController.uploadAvatar);

router.put("/update/:id", verifyToken, userController.updateUserProfile)

// router.get("/get-all/avatar", uploadController.getListFiles);

module.exports = router;
