import express from "express";
import {
  addProduct,
  allProduct,
  changeDetail,
  deleteProduct,
  loginAdmin,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/add-product", authAdmin, upload.single("image"), addProduct);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/all-products", authAdmin, allProduct);
adminRouter.post(
  "/change-detail",
  authAdmin,
  upload.single("image"),
  changeDetail
);
adminRouter.post("/delete-product", authAdmin, deleteProduct);
export default adminRouter;
