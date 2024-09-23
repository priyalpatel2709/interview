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
router.route("/").post(addMockData);
router.get("/", getAllMockData);
router.get("/:id", getMockDataById);
router.put("/:id", updateMockData);
router.delete("/:id", deleteMockData);

module.exports = router;
