const express = require("express");
const {
  fetchSetFlows,
  setNewFlow,
} = require("../controllers/setFlowControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(protect, fetchSetFlows);
router.route("/").post(protect, setNewFlow);

module.exports = router;
