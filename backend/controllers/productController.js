import productModel from "../Models/productModel.js";

const productList = async (req, res) => {
  try {
    const products = await productModel.find({}).select(["-date"]);

    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { productList };
