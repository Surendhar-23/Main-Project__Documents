const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    personalDetails: {
      fullName: { type: String, required: true },
      dateOfBirth: { type: Date, required: true },
      gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
      },
      contactInfo: {
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
      },
      address: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
      },
    },

    academicInfo: {
      currentGrade: { type: String, required: true },
      institutionName: { type: String, required: true },
      enrolledSubjects: [{ type: String }],
      academicGoals: { type: String },
    },

    learningPreferences: {
      learningStyle: {
        type: String,
        enum: ["Visual", "Auditory", "Kinesthetic", "Other"],
      },
      pace: { type: String, enum: ["Fast", "Moderate", "Slow"] },
      areasOfInterest: [{ type: String }],
      quizFrequency: { type: String, enum: ["Daily", "Weekly", "Other"] },
      notificationTime: { type: String },
    },

    skillAssessment: {
      subjectProficiency: [
        {
          subject: { type: String },
          level: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
          },
        },
      ],
      languageProficiency: {
        grammar: {
          type: String,
          enum: ["Poor", "Average", "Good", "Excellent"],
        },
        pronunciation: {
          type: String,
          enum: ["Poor", "Average", "Good", "Excellent"],
        },
      },
      writingSkills: {
        essayAbility: {
          type: String,
          enum: ["Poor", "Average", "Good", "Excellent"],
        },
      },
    },

    performanceHistory: {
      academicPerformance: [
        {
          subject: { type: String },
          grade: { type: String },
        },
      ],
      extracurricularActivities: [{ type: String }],
      struggles: { type: String },
    },

    systemPreferences: {
      recommendationsEnabled: { type: Boolean, default: true },
      aiConsent: { type: Boolean, required: true },
      communityInteraction: { type: Boolean, default: true },
    },

    authentication: {
      studentId: { type: String, unique: true, required: true },
      username: { type: String, unique: true, required: true },
      password: { type: String, required: true },
    },

    guardianInfo: {
      name: { type: String },
      contactInfo: {
        email: { type: String },
        phone: { type: String },
      },
      relationship: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
