import express from "express";
import jwt from "jsonwebtoken";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
} from "../controller/productController.js";

const router = express.Router();

// 🔐 Reuse same style middleware
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

// Product Routes (all protected)
router.post("/create", checkToken, createProduct);
router.get("/all", checkToken, getAllProducts);
router.put("/update/:id", checkToken, updateProduct);
router.delete("/delete/:id", checkToken, deleteProduct);

export default router;