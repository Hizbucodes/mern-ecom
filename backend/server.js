import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/product.route.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/v1/products", productRoute);

app.get("/", (req, res) => {
  res.send("Server is ready");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  connectDB();
  console.log("Server started on port: ", PORT);
});
