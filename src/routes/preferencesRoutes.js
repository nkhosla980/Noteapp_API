const express = require("express");
const {
  getPreferences,
  updatePreferences,
} = require("../controllers/preferencesController");
const authMiddleware = require("../middleware/authmiddleware");
const router = express.Router();

router.use(authMiddleware);

router.get("/", getPreferences);
router.put("/", updatePreferences);

module.exports = router;
