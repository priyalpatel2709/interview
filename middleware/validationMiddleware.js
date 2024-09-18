const { body, validationResult } = require("express-validator");

// Middleware to validate data for adding mock data
const validateAddMockData = [
  body("name").notEmpty().withMessage("Name is required"),
  body("age")
    .isInt({ min: 0 })
    .withMessage("Age must be a non-negative integer"),
  body("message").notEmpty().withMessage("Message is required"),
];

// Middleware to validate data for updating mock data
const validateUpdateMockData = [
  body("age")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Age must be a non-negative integer"),
  // Add other fields as needed for update validation
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateAddMockData,
  validateUpdateMockData,
  handleValidationErrors,
};
