import Feedback from "../models/Feedback.js";
import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";
import { getViewerContext, ROLES } from "../utils/roleHelpers.js";

export const createFeedback = asyncHandler(async (req, res) => {
  const { text, role, author, goalId = null } = req.body;

  if (!text?.trim()) {
    throw new AppError("Feedback text is required.", 400);
  }

  if (!Object.values(ROLES).includes(role)) {
    throw new AppError("Invalid feedback role.", 400);
  }

  if (!author?.trim()) {
    throw new AppError("Author name is required.", 400);
  }

  const feedback = await Feedback.create({
    text: text.trim(),
    role,
    author: author.trim(),
    goalId
  });

  return res.status(201).json({
    success: true,
    message: "Feedback submitted successfully.",
    data: feedback
  });
});

export const getFeedback = asyncHandler(async (req, res) => {
  const { viewerRole, viewerName } = getViewerContext(req);
  const query = {};

  if (viewerRole === ROLES.EMPLOYEE && viewerName) {
    query.author = viewerName;
  }

  const data = await Feedback.find(query).sort({ createdAt: -1 });

  return res.json({
    success: true,
    data
  });
});
