const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      required: [true, "Please add description"],
    },
    category: {
      type: String,
      required: [true, "Please add a type"],
    },
    start_time: {
      type: Date,
      required: [true, "Please mention the start time"],
    },
    duration: {
      type: Number,
      required: [true, "Please enter the duration"],
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("task", taskSchema);

module.exports = Task;
