import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.post("/api/products", async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide all fields",
    });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    return res.status(200).json({
      status: "Success",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      message: "Server Error",
    });
  }
});

app.get("/api/products/getAllProducts", async (req, res) => {
  try {
    const result = await Product.find({});

    return res.status(200).json({
      status: "Success",
      lenght: result.length,
      data: result,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Fail",
      message: `Products Not Avaialable: ${err}`,
    });
  }
});

app.patch("/api/products/update/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      status: "Fail",
      message: "Inavalid Product ID",
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
    });

    return res.status(200).json({
      status: "Success",
      data: updatedProduct,
      message: `Product is Updated with ID ${id}`,
    });
  } catch (err) {
    return res.status(500).json({
      status: "Fail",
      message: "Server Error",
    });
  }
});

app.delete("/api/products/delete/:id", async (req, res) => {
  const { id } = req.params;

  const isProductAvailable = await Product.findById(id);

  if (!isProductAvailable) {
    return res.status(404).json({
      status: "Fail",
      message: "Requested Product ID is not Available to Delete",
    });
  }

  await Product.findByIdAndDelete(id);

  return res.status(200).json({
    status: "Success",
    message: `Product with ID ${id} Deleteted SuccessFully`,
  });
});

app.listen(5000, () => {
  connectDB();
  console.log("Server started on port: 5000");
});
