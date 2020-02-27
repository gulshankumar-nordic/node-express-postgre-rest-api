const express = require("express");
const { register, login } = require("../controllers/userauth");

const router = express.Router();
const { protect } = require("../middleware/authorization");
router.post("/register", register);
router.post("/login", login);

module.exports = router;
