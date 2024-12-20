// MongoDB Schema for Admin
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    personalDetails: {
      fullName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      phoneNumber: { type: String, required: true },
    },
    systemPreferences: {
      theme: { type: String, default: "light" },
      language: { type: String, default: "en" },
    },
    rolesAndPermissions: {
      role: { type: String, default: "Admin" },
      permissions: {
        canManageUsers: { type: Boolean, default: true },
        canModerateContent: { type: Boolean, default: true },
        canViewReports: { type: Boolean, default: true },
        canConfigureSystem: { type: Boolean, default: true },
      },
    },
    authentication: {
      passwordHash: { type: String, required: true },
      passwordResetToken: { type: String },
      passwordResetExpires: { type: Date },
    },
    activityLog: [
      {
        action: { type: String },
        timestamp: { type: Date, default: Date.now },
        details: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
