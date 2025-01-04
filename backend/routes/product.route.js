import express from "express";
import {
  createNewProduct,
  deleteAProduct,
  getAllProducts,
  updateAProduct,
} from "../controller/product.controller.js";

const router = express.Router();

router.route("/").post(createNewProduct);
router.route("/getAllProducts").get(getAllProducts);
router.route("/update/:id").patch(updateAProduct);
router.route("/delete/:id").delete(deleteAProduct);

export default router;
