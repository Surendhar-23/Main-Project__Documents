// Import mongoose
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Define the schema for Teacher
const teacherSchema = new Schema({
  personalDetails: {
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    contactInfo: {
      email: { type: String, required: true, unique: true },
      phone: { type: String, required: true },
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
  },
  professionalDetails: {
    institution: { type: String, required: true },
    subjectsTaught: [{ type: String, required: true }],
    yearsOfExperience: { type: Number, required: true },
    qualifications: [{ type: String, required: true }],
  },
  systemPreferences: {
    receiveNotifications: { type: Boolean, default: true },
    communityParticipation: { type: Boolean, default: true },
  },
  classesManaged: [
    {
      className: { type: String, required: true },
      students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    },
  ],
  authentication: {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Add timestamps
teacherSchema.set("timestamps", true);

// Export the model
module.exports = mongoose.model("Teacher", teacherSchema);
