import Product from "../models/product.model.js";
import mongoose from "mongoose";

const createNewProduct = async (req, res) => {
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
};

const getAllProducts = async (req, res) => {
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
};

const updateAProduct = async (req, res) => {
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
};

const deleteAProduct = async (req, res) => {
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
};

export { createNewProduct, getAllProducts, updateAProduct, deleteAProduct };
