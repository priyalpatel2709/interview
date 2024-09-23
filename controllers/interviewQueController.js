const express = require("express");
const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const NodeCache = require("node-cache");
const MockData = require("../models/interviewQueModel");
const { logger } = require("../helper/logger");
const { validationResult } = require("express-validator");
const {
  validateAddMockData,
  validateUpdateMockData,
} = require("../middleware/validationMiddleware");

const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes cache

const handleErrors = (res, error, message = "Internal Server Error") => {
  console.log(`${message}: ${error.message}`, { stack: error.stack });

  res.status(500).json({ message });
};

const authUser = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await MockData.findOne({ email }).select("-__v");
  if (!user) {
    return res.status(401).json({ error: "Invalid email" });
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

const addMockData = asyncHandler(async (req, res) => {
  try {
    const newData = new MockData(req.body);
    const createdData = await newData.save();

    // Invalidate the cache for getAllMockData
    cache.del("allMockData");

    res.status(201).json({
      message: "Mock data added successfully!",
      data: createdData,
    });
  } catch (error) {
    handleErrors(res, error, "Error adding mock data");
  }
});

const getAllMockData = asyncHandler(async (req, res) => {
  const cacheKey = "allMockData";
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return res.status(200).json(cachedData);
  }

  try {
    const data = await MockData.find({}).lean().select("-__v");
    cache.set(cacheKey, data);

    res.status(200).json(data);
  } catch (error) {
    handleErrors(res, error, "Error fetching mock data");
  }
});

const getMockDataById = asyncHandler(async (req, res) => {
  const cacheKey = `mockData_${req.params.id}`;
  const cachedData = cache.get(cacheKey);

  if (cachedData) {
    return res.status(200).json(cachedData);
  }

  try {
    const data = await MockData.findById(req.params.id).lean().select("-__v");
    if (!data) {
      return res.status(404).json({ message: "Mock data not found" });
    }
    cache.set(cacheKey, data);

    res.status(200).json(data);
  } catch (error) {
    handleErrors(res, error, "Error fetching mock data by ID");
  }
});

const updateMockData = asyncHandler(async (req, res) => {
  try {
    const updatedData = await MockData.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    ).select("-__v");

    if (!updatedData) {
      return res.status(404).json({ message: "Mock data not found" });
    }

    cache.del(`mockData_${req.params.id}`);
    cache.del("allMockData");

    res.status(200).json({
      message: "Mock data updated successfully!",
      data: updatedData,
    });
  } catch (error) {
    handleErrors(res, error, "Error updating mock data");
  }
});

const deleteMockData = asyncHandler(async (req, res) => {
  try {
    const deletedData = await MockData.findByIdAndDelete(req.params.id);

    if (!deletedData) {
      return res.status(404).json({ message: "Mock data not found" });
    }

    cache.del(`mockData_${req.params.id}`);
    cache.del("allMockData");

    res.status(200).json({ message: "Mock data deleted successfully!" });
  } catch (error) {
    handleErrors(res, error, "Error deleting mock data");
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
