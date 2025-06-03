const express = require("express");
const router = express.Router();
const statusController = require("../controllers/statusController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require('../middlewares/statusMiddleware');

router.post('/statuses', authMiddleware, upload.single('photo'), statusController.createStatus);
router.get("/statuses", authMiddleware, statusController.getAllStatuses);
router.delete("/statutes:id", authMiddleware, statusController.deleteStatus);

module.exports = router;
