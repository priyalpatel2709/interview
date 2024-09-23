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
router.route("/").post(validateAddMockData, addMockData);
router.route("/v1/").post(protect, validateAddMockData, addMockData);
router.get("/", getAllMockData);
router.get("/v1/", protect, getAllMockData);
router.get("/:id", getMockDataById);
router.get("/v1/:id", protect, getMockDataById);
router.put("/:id", validateUpdateMockData, updateMockData);
router.put("/v1/:id", protect, validateUpdateMockData, updateMockData);
router.delete("/:id", deleteMockData);
router.delete("/v1/:id", protect, deleteMockData);

module.exports = router;
