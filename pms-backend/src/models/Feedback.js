import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Feedback text is required."],
      trim: true,
      maxlength: [500, "Feedback cannot exceed 500 characters."]
    },
    role: {
      type: String,
      enum: ["employee", "manager", "admin"],
      required: [true, "Role is required."]
    },
    author: {
      type: String,
      required: [true, "Author name is required."],
      trim: true
    },
    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      default: null
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Feedback", feedbackSchema);
