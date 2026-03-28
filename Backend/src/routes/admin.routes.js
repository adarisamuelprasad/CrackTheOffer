const express = require("express");
const router = express.Router();
const { authUser, isAdmin } = require("../middlewares/auth.middleware");
const { getAllUsers, getAllReports, deleteUser } = require("../controllers/admin.controller");

router.get("/users", authUser, isAdmin, getAllUsers);
router.get("/reports", authUser, isAdmin, getAllReports);
router.delete("/user/:userId", authUser, isAdmin, deleteUser);

module.exports = router;
