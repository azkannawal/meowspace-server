const express = require("express");
const router = express.Router();
const statusController = require("../controllers/statusController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/statuses", authMiddleware, statusController.createStatus);
router.get("/statuses", authMiddleware, statusController.getAllStatuses);
router.delete("/statutes:id", authMiddleware, statusController.deleteStatus);

module.exports = router;
