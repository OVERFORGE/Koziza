import express from "express";
import { productList } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.get("/list", productList);

export default productRouter;
