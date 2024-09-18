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
} = require("../controllers/interviewQueController");

const router = express.Router();

router.route("/").post(addMockData);
router.get("/", getAllMockData);
router.get("/:id", getMockDataById);
router.put("/:id", updateMockData);
router.delete("/:id", deleteMockData);

module.exports = router;
