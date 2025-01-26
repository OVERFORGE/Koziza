import React, { useContext, useState } from "react";
import "../App.css";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
function ProductPage() {
  const { category } = useParams();
  const [filterProduct, setFilterProduct] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();
  const { products, addToCart } = useContext(AppContext);
  const applyFilter = () => {
    if (category) {
      setFilterProduct(
        products.filter((product) => product.category === category)
      );
    } else {
      setFilterProduct(products);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [products, category]);
  return (
    <div class="product-page">
      <p className="font-mySmallFont text-[#200125] ">
        Browse through the Product List.
      </p>
      <div className="font-mySmallFont flex flex-col sm:flex-row items-start gap-14 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden border-[#200125] ${
            showFilter ? "bg-[#200125] text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>
        <div
          className={`flex-col gap-4 text-sm text-[#200125]  ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          <p
            onClick={() => {
              category === "Sticker"
                ? navigate("/products/")
                : navigate("/products/Sticker");
            }}
            className={`w-[70vw] bg-[#FFFDEE] sm:w-auto pl-3 py-1.5 pr-16 border border-[#200125] rounded transition-all cursor-pointer ${
              category === "Sticker" ? "bg-[#e57373] text-[#200125]" : ""
            }`}
          >
            Sticker
          </p>
          <p
            onClick={() => {
              category === "Pottery"
                ? navigate("/products/")
                : navigate("/products/Pottery");
            }}
            className={`w-[70vw] bg-[#FFFDEE] sm:w-auto pl-3 py-1.5 pr-16 border border-[#200125] rounded transition-all cursor-pointer ${
              category === "Pottery" ? "bg-[#e57373] text-[#200125]" : ""
            }`}
          >
            Pottery
          </p>
          <p
            onClick={() => {
              category === "Crochet"
                ? navigate("/products/")
                : navigate("/products/Crochet");
            }}
            className={`w-[70vw] bg-[#FFFDEE] sm:w-auto pl-3 py-1.5 pr-16 border border-[#200125] rounded transition-all cursor-pointer ${
              category === "Crochet" ? "bg-[#e57373] text-[#200125]" : ""
            }`}
          >
            Crochet
          </p>
          <p
            onClick={() => {
              category === "Illustration"
                ? navigate("/products/")
                : navigate("/products/Illustration");
            }}
            className={`w-[70vw] bg-[#FFFDEE]     sm:w-auto pl-3 py-1.5 pr-16 border border-[#200125] rounded transition-all cursor-pointer ${
              category === "Illustration" ? "bg-[#e57373] text-[#200125]" : ""
            }`}
          >
            Illustration
          </p>
        </div>
        <div className={"w-full flex flex-wrap gap-4 gap-y-6"}>
          {filterProduct.map((item, index) => (
            <div
              key={index}
              className="bg-[#e57373] border w-96 sm:w-48 md:w-52 lg:w-64 border-[#200125] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 "
            >
              <img
                onClick={() => navigate(`/this-product/${item._id}`)}
                className="bg-blue-50"
                src={item.image}
                alt=""
              />
              <div
                onClick={() => navigate(`/this-product/${item._id}`)}
                className="p-4 h-32"
              >
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-900 text-2xl font-medium">
                  QR {item.price}
                </p>
                <p className="text-gray-600 text-sm">{item.category}</p>
              </div>
              <div className="p-4 flex gap-2 justify-around">
                <button className="text-xs font-[#200125] font-medium bg-[#FFFDEE] rounded-lg py-3 px-4 border border-[#200125] hover:bg-[#200125] hover:text-[#FFFDEE] transition-all duration-500">
                  BUY NOW
                </button>
                <button
                  onClick={() => addToCart(item._id)}
                  className="text-xs font-[#200125] font-medium bg-[#FFFDEE] rounded-lg py-3 px-4 border border-[#200125] hover:bg-[#200125] hover:text-[#FFFDEE] transition-all duration-500"
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default ProductPage;
