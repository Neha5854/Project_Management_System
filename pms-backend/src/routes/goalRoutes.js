import express from "express";
import {
  createGoal,
  getGoals,
  approveGoal
} from "../controllers/goalController.js";

const router = express.Router();

router.post("/", (req, res, next) => {
  console.log("[goalRoutes] POST /api/goals body:", req.body);
  console.log("[goalRoutes] POST /api/goals headers:", {
    userRole: req.headers["x-user-role"],
    userName: req.headers["x-user-name"]
  });
  next();
}, createGoal);
router.get("/", getGoals);
router.put("/:id/approve", approveGoal);

export default router;
