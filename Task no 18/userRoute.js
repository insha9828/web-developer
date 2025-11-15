import express from "express";
import jwt from "jsonwebtoken";
import {
  signupUser,
  loginUser,
  getProfile,
  forgotPassword,
  changePassword
} from "../controller/userController.js";

const router = express.Router();

// 🔐 Simple Middleware inside same file
const checkToken = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.json({ message: "Token missing ❌" });

  const token = header.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "secretkey");
    req.userId = decoded.id;
    next();
  } catch {
    res.json({ message: "Invalid token ❌" });
  }
};

// Routes
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/profile", checkToken, getProfile);
router.get("/forgot-password", forgotPassword);
router.post("/change-password", checkToken, changePassword);

export default router;