//API For adding Products
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import jwt from "jsonwebtoken";

const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, date } = req.body;
    const imageFile = req.file;

    //Check If all data is recieved
    if (!name || !price || !description || !category || !imageFile) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    //Uploading image on cloud
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    const productData = {
      name,
      price,
      description,
      image: imageUrl,
      category,
      date: Date.now(),
    };
    console.log(productData);
    const newProduct = new productModel(productData);
    await newProduct.save();
    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API FOR ADMIN LOGIN

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// API FOR PRODUCT LIST
const allProduct = async (req, res) => {
  try {
    const products = await productModel.find({}).select("-date");
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API TO CHANGE DETAIL
const changeDetail = async (req, res) => {
  try {
    const { _id, name, price, description, category, image } = req.body;
    const imageFile = req.file;

    if (imageFile === undefined) {
      await productModel.findByIdAndUpdate(_id, {
        name: name,
        price: price,
        description: description,
        category: category,
        date: Date.now(),
      });
      res.json({ success: true, message: "data changed successfully" });
    } else {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;
      await productModel.findByIdAndUpdate(_id, {
        name: name,
        price: price,
        description: description,
        image: imageUrl,
        category: category,
        date: Date.now(),
      });
      res.json({ success: true, message: "data changed successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//API TO DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product Successfully Deleted" });
  } catch (error) {}
};

export { addProduct, loginAdmin, allProduct, changeDetail, deleteProduct };
