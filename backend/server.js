import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());

//api endpoints
app.use("/api/admin", adminRouter); //loaclhost:4000/api/admin
app.use("/api/product", productRouter);
app.use("/api/user", userRouter); //localhost:4000/api/user
app.use("/api/cart", cartRouter); //localhost:4000/api/cart
app.use("/api/order", orderRouter); //localhost:4000/api/order

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => console.log("Server started ", port));
