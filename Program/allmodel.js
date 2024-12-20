const mongoose = require("mongoose");

// Admin Model
const adminSchema = new mongoose.Schema({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  roles: [
    {
      type: String,
      enum: ["superadmin", "moderator", "content_manager"],
      default: "moderator",
    },
  ],
  permissions: [
    {
      module: { type: String, required: true },
      actions: [String], // e.g., ['create', 'read', 'update', 'delete']
    },
  ],
  preferences: {
    theme: { type: String, default: "light" },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
    },
  },
  activityLog: [
    {
      action: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
      ipAddress: { type: String },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Admin", adminSchema);

// Additional Models

// Student Model
const studentSchema = new mongoose.Schema({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  profile: {
    strengths: [String],
    interests: [String],
    academicGoals: [String],
    preferences: {
      learningPace: {
        type: String,
        enum: ["fast", "medium", "slow"],
        default: "medium",
      },
      quizFrequency: {
        type: String,
        enum: ["daily", "weekly"],
        default: "weekly",
      },
    },
  },
  progress: {
    quizzesTaken: [
      {
        quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
        score: Number,
        date: { type: Date, default: Date.now },
      },
    ],
    skillRatings: Map, // e.g., { "math": 80, "science": 75 }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Student", studentSchema);

// Teacher Model
const teacherSchema = new mongoose.Schema({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  subjects: [String],
  students: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      feedback: { type: String },
    },
  ],
  quizzes: [
    {
      quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
      assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Teacher", teacherSchema);

// Quiz Model
const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [String],
      correctOption: { type: Number, required: true },
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Quiz", quizSchema);

// Community Post Model
const communityPostSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  content: { type: String, required: true },
  comments: [
    {
      commenter: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
      comment: { type: String },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CommunityPost", communityPostSchema);

// Class Model
const classSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "10th Grade A"
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  subject: { type: String, required: true }, // e.g., "Mathematics"
  schedule: {
    days: [String], // e.g., ["Monday", "Wednesday", "Friday"]
    time: { type: String }, // e.g., "10:00 AM - 11:00 AM"
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Class", classSchema);
