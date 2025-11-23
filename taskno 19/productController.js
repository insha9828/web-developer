import Product from "../models/productSchema.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      category
    });

    res.status(201).json({ message: "Product created ✔", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) return res.json({ message: "Product not found ❌" });

    res.json({ message: "Product updated ✔", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) return res.json({ message: "Product not found ❌" });

    res.json({ message: "Product deleted ✔" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};