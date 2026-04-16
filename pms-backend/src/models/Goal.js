import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Goal title is required."],
      trim: true,
      maxlength: [120, "Goal title cannot exceed 120 characters."]
    },
    description: {
      type: String,
      trim: true,
      maxlength: [300, "Description cannot exceed 300 characters."],
      default: ""
    },
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending"
    },
    createdBy: {
      type: String,
      required: [true, "Creator name is required."],
      trim: true
    },
    ownerRole: {
      type: String,
      enum: ["employee", "manager", "admin"],
      default: "employee"
    },
    approvedBy: {
      type: String,
      trim: true,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Goal", goalSchema);
