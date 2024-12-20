const Admin = require("../models/Admin");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const Class = require("../models/Class");
const Quiz = require("../models/Quiz");
const CommunityPost = require("../models/CommunityPost");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Admin Controller

const adminController = {
  async registerAdmin(req, res) {
    try {
      const { firstName, lastName, email, password, phoneNumber, roles } =
        req.body;

      // Check if email already exists
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin)
        return res.status(400).json({ message: "Email already registered." });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new admin
      const admin = new Admin({
        name: { firstName, lastName },
        email,
        password: hashedPassword,
        phoneNumber,
        roles,
      });

      await admin.save();
      res.status(201).json({ message: "Admin registered successfully." });
    } catch (error) {
      res.status(500).json({ message: "Server error.", error });
    }
  },

  async loginAdmin(req, res) {
    try {
      const { email, password } = req.body;

      // Check if admin exists
      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(404).json({ message: "Admin not found." });

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid)
        return res.status(400).json({ message: "Invalid credentials." });

      // Generate JWT token
      const token = jwt.sign(
        { id: admin._id, roles: admin.roles },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      res.status(200).json({ token, message: "Login successful." });
    } catch (error) {
      res.status(500).json({ message: "Server error.", error });
    }
  },

  async getAllAdmins(req, res) {
    try {
      const admins = await Admin.find();
      res.status(200).json(admins);
    } catch (error) {
      res.status(500).json({ message: "Server error.", error });
    }
  },

  async deleteAdmin(req, res) {
    try {
      const { id } = req.params;

      // Delete admin
      const result = await Admin.findByIdAndDelete(id);
      if (!result) return res.status(404).json({ message: "Admin not found." });

      res.status(200).json({ message: "Admin deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: "Server error.", error });
    }
  },

  async updateAdmin(req, res) {
    try {
      const { id } = req.params;
      const { firstName, lastName, email, phoneNumber, roles } = req.body;

      const updatedData = {
        name: { firstName, lastName },
        email,
        phoneNumber,
        roles,
      };

      const admin = await Admin.findByIdAndUpdate(id, updatedData, {
        new: true,
      });
      if (!admin) return res.status(404).json({ message: "Admin not found." });

      res.status(200).json({ message: "Admin updated successfully.", admin });
    } catch (error) {
      res.status(500).json({ message: "Server error.", error });
    }
  },
};

module.exports = adminController;
