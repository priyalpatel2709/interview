const mongoose = require("mongoose");

const interviewQue = mongoose.Schema(
  {
    name: { type: String, required: true }, // String type for the name field
    email: { type: String },
    age: { type: Number, required: true }, // Number type for age field
    isActive: { type: Boolean, default: false }, // Boolean to indicate active status
    joinDate: { type: Date, default: Date.now }, // Date type for the join date
    message: { type: String, required: true }, // String type for a message
    salary: { type: mongoose.Types.Decimal128 }, // Decimal type for salary or financial data
    hobbies: { type: [String] }, // Array of strings to store hobbies or interests
    address: {
      street: { type: String },
      city: { type: String },
      postalCode: { type: Number },
    }, // Nested object to store address details
    metadata: { type: mongoose.Schema.Types.Mixed }, // Flexible data structure
  },
  { timestamps: true } // Automatically includes createdAt and updatedAt fields
);

const mockData = mongoose.model("MockData", interviewQue);
module.exports = mockData;
