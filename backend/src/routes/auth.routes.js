const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/me", protect, authController.getMe); // protected

module.exports = router;
