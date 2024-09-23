const express = require("express");
const {
  validateAddMockData,
  validateUpdateMockData,
} = require("../middleware/validationMiddleware");
const {
  addMockData,
  getAllMockData,
  getMockDataById,
  updateMockData,
  deleteMockData,
  authUser,
} = require("../controllers/interviewQueController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/login").post(authUser);
router.route("/").post(protect, addMockData);
router.get("/", protect, getAllMockData);
router.get("/:id", protect, getMockDataById);
router.put("/:id", protect, updateMockData);
router.delete("/:id", protect, deleteMockData);

module.exports = router;
