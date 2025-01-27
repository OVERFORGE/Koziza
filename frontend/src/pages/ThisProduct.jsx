import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const ThisProduct = () => {
  const { prodId } = useParams();

  const [prodInfo, setProdInfo] = useState([]);
  const [prodQuantity, setProdQuantity] = useState(1);
  const { cartProducts, addToCart, removeFromCart, products, toggleMenu } =
    useContext(AppContext);
  const fetchProdInfo = async () => {
    const prodInfo = products.find((prod) => prod._id === prodId);
    setProdInfo(prodInfo);
    console.log(prodInfo);
  };

  useEffect(() => {
    fetchProdInfo();
  }, [products, prodId]);

  return (
    prodInfo && (
      <div
        className={`mt-[-200px] mb-[-200px]  pt-[240px] pb-[240px] font-mySmallFont w-full bg-[#ffbeca] px-10 sm:px-20   md:px-30 lg:px-40 ${
          toggleMenu ? "pt-[270px] mt-[-260px]" : ""
        } `}
      >
        <div className="m-auto border bg-[#e57373] border-[#200125] rounded-lg p-5 flex flex-col sm:flex-row sm:gap-10 ">
          <div className="rounded-lg w-full sm:w-1/2 mb-4 md:mb-0">
            <img className="rounded-md w-full " src={prodInfo.image} alt="" />
          </div>
          <div className="w-full sm:w-1/2">
            <div className="h-3/6">
              <p className="md:text-4xl text-2xl font-bold text-[#200125]">
                {prodInfo.name}
              </p>
              <p className="md:text-2xl text-lg font-semibold text-gray-700">
                {prodInfo.category}
              </p>
              <p className="md:text-5xl text-3xl font-extrabold text-[#200125] lg:mt-4">
                QR {prodInfo.price}
              </p>
              <div className="w-full flex flex-col sm:flex-row mt-4 lg:gap-14">
                <div className="flex mb-4">
                  <button
                    className="px-3 px-4 bg-[#200125] text-[#FFFDEE] rounded-tl-xl font-extrabold rounded-bl-xl max-h-14"
                    onClick={() => {
                      if (prodQuantity > 1) {
                        setProdQuantity(prodQuantity - 1);
                        removeFromCart(prodInfo._id);
                      }
                    }}
                  >
                    -
                  </button>
                  <p className="py-3 px-4 text-lg border border-[#200125] bg-[#FFFDEE] font-bold max-h-14">
                    {prodQuantity}
                  </p>
                  <button
                    onClick={() => {
                      if (prodQuantity < 10) {
                        setProdQuantity(prodQuantity + 1);
                        addToCart(prodInfo._id);
                      }
                    }}
                    className="px-3 px-4 bg-[#200125] text-[#FFFDEE] rounded-tr-xl font-extrabold rounded-br-xl max-h-14"
                  >
                    +
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  <button className="bg-[#FFFDEE] px-12 md:px-24 py-4 rounded-xl border border-[#200125] hover:bg-[#200125] hover:text-[#FFFDEE] font-bold transition-all duration-200">
                    BUY NOW
                  </button>
                  <button
                    onClick={() => addToCart(prodInfo._id)}
                    className="bg-[#FFFDEE] px-12 md:px-24 py-4 rounded-xl border border-[#200125] hover:bg-[#200125] hover:text-[#FFFDEE] font-bold transition-all duration-200"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            </div>
            <div className="min-h-3/6 mt-4 md:mt-0">
              <p className="lg:text-xl font-semibold lg:mt-6 text-[#200125]">
                Description
              </p>
              <p>{prodInfo.description}</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ThisProduct;
