import Goal from "../models/Goal.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getViewerContext, ROLES } from "../utils/roleHelpers.js";

export const createGoal = asyncHandler(async (req, res) => {
  const { title, description = "", createdBy: bodyCreatedBy, ownerRole: bodyOwnerRole } = req.body;
  const createdBy = bodyCreatedBy?.trim() || req.headers["x-user-name"] || "Employee";
  const ownerRole = bodyOwnerRole || req.headers["x-user-role"] || ROLES.EMPLOYEE;

  console.log("[goalController.createGoal] req.body:", req.body);
  console.log("[goalController.createGoal] resolved user:", {
    createdBy,
    ownerRole
  });

  if (!title?.trim()) {
    throw new AppError("Goal title is required.", 400);
  }

  if (![ROLES.EMPLOYEE, ROLES.ADMIN].includes(ownerRole)) {
    throw new AppError("Only employees or admins can create goals.", 403);
  }

  const goal = await Goal.create({
    title: title.trim(),
    description: description?.trim() || "",
    createdBy: createdBy.trim(),
    ownerRole
  });

  console.log("[goalController.createGoal] saved goal:", goal);

  return res.status(201).json({
    success: true,
    message: "Goal submitted for approval.",
    data: goal
  });
});

export const getGoals = asyncHandler(async (req, res) => {
  const { viewerRole, viewerName } = getViewerContext(req);
  const query = {};

  if (viewerRole === ROLES.EMPLOYEE && viewerName) {
    query.createdBy = viewerName;
  }

  if (req.query.status) {
    query.status = req.query.status;
  }

  const goals = await Goal.find(query).sort({ createdAt: -1 });
  console.log("[goalController.getGoals] query/result count:", query, goals.length);

  return res.json({
    success: true,
    data: goals
  });
});

export const approveGoal = asyncHandler(async (req, res) => {
  const { approverName, approverRole } = req.body;
  console.log("[goalController.approveGoal] request:", {
    goalId: req.params.id,
    approverName,
    approverRole
  });

  if (![ROLES.MANAGER, ROLES.ADMIN].includes(approverRole)) {
    throw new AppError("Only managers or admins can approve goals.", 403);
  }

  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    throw new AppError("Goal not found.", 404);
  }

  if (goal.status === "approved") {
    throw new AppError("Goal is already approved.", 400);
  }

  goal.status = "approved";
  goal.approvedBy = approverName?.trim() || approverRole;
  await goal.save();

  return res.json({
    success: true,
    message: "Goal approved successfully.",
    data: goal
  });
});
