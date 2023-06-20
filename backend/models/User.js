const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an emailid"],
      unique: true,
    },
    role: {
      type: String,
      required: [true, "Please specify a role"],
    },
    dept: {
      type: String,
      required: [true, "Please mention the dept"],
    },
    contact: {
      type: String,
      required: [true, "Please add a contact number"],
    },
    join_date: {
      type: Date,
      required: [true, "Please mention the joining date"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model("user", userSchema);
