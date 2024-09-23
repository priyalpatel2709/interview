const express = require("express");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const NodeCache = require("node-cache");
const MockData = require("../models/interviewQueModel");
const logger = require("../helper/logger");
const { validationResult } = require("express-validator");
const {
  validateAddMockData,
  validateUpdateMockData,
} = require("../middleware/validationMiddleware");

const cache = new NodeCache();

const authUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log("File: interviewQueController.js", "Line 16:", email);
  // Find user by email
  const user = await MockData.findOne({ email });
  // console.log("File: interviewQueController.js", "Line 16:", user);
  // Validate user credentials
  if (!user) {
    // throw createError(401, "Invalid email or password");
    return res.status(401).json({ error: "Invalid email" });
  }

  // Return user info and generated token
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

// Add Mock Data with Validation
const addMockData = [
  ...validateAddMockData,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      age,
      isActive,
      joinDate,
      message,
      salary,
      hobbies,
      address,
      metadata,
      email,
    } = req.body;

    try {
      const newData = new MockData({
        name,
        age,
        isActive,
        joinDate,
        message,
        salary,
        hobbies,
        address,
        metadata,
        email,
      });

      const createdData = await newData.save();

      res.status(201).json({
        message: "Mock data added successfully!",
        data: createdData,
      });
    } catch (error) {
      // logger.error("Error adding mock data:", error);
      console.log("File: interviewQueController.js", "Line 77:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }),
];

// Get All Mock Data
const getAllMockData = asyncHandler(async (req, res) => {
  try {
    const data = await MockData.find({});
    res.status(200).json(data);
  } catch (error) {
    // logger.error("Error fetching mock data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get a Single Mock Data Entry by ID
const getMockDataById = asyncHandler(async (req, res) => {
  try {
    const data = await MockData.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Mock data not found" });
    }

    res.status(200).json(data);
  } catch (error) {
    // logger.error("Error fetching mock data by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update Mock Data
const updateMockData = [
  ...validateUpdateMockData,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const {
        name,
        age,
        isActive,
        joinDate,
        message,
        salary,
        hobbies,
        address,
        metadata,
      } = req.body;

      const data = await MockData.findById(req.params.id);

      if (!data) {
        return res.status(404).json({ message: "Mock data not found" });
      }

      data.name = name || data.name;
      data.age = age ?? data.age;
      data.isActive = isActive ?? data.isActive;
      data.joinDate = joinDate || data.joinDate;
      data.message = message || data.message;
      data.salary = salary || data.salary;
      data.hobbies = hobbies || data.hobbies;
      data.address = address || data.address;
      data.metadata = metadata || data.metadata;

      const updatedData = await data.save();

      res.status(200).json({
        message: "Mock data updated successfully!",
        data: updatedData,
      });
    } catch (error) {
      // logger.error("Error updating mock data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }),
];

// Delete Mock Data
const deleteMockData = asyncHandler(async (req, res) => {
  try {
    const data = await MockData.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Mock data not found" });
    }

    res.status(200).json({ message: "Mock data deleted successfully!" });
  } catch (error) {
    // logger.error("Error deleting mock data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = {
  addMockData,
  getAllMockData,
  getMockDataById,
  updateMockData,
  deleteMockData,
  authUser,
};
