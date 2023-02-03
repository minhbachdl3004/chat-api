const {
  verifyToken,
  verifyTokenAndUserAuthorization,
} = require("../controllers/middlewareController");
const userController = require("../controllers/userController");

const router = require("express").Router();

// GET ALL USERS
router.get("/", verifyToken, userController.getAllUsers);

// GET USER BY NAME
router.get("/search", verifyToken, userController.getUserByName)

// DELETE USER
router.delete("/:id", verifyTokenAndUserAuthorization, userController.deleteUser);


// PROMOTE TO ADMIN
router.post("/admin/:id", userController.promoteToAdmin)

module.exports = router;
