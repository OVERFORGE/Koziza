import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faX } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const {
    cartProducts,
    products,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    toggleMenu,
  } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div
      className={`font-mySmallFont mt-[-200px] mb-[-160px]  pt-[240px] pb-[240px] text-[10px] md:text-base bg-[#ffbeca] ${
        toggleMenu ? "pt-[270px] mt-[-260px]" : ""
      } `}
    >
      <div className="md:px-40 sm:px-20 px-10 sm:text-md">
        <div className="grid grid-cols-12 items-center text-[#200125] font-semibold">
          <p className="grid grid-cols-subgrid col-span-1">Items</p>
          <p className="grid grid-cols-subgrid col-span-3 w-full">
            <p className="col-start-2">Title</p>
          </p>
          <p className="grid grid-cols-subgrid col-span-2">Price</p>
          <p className="grid grid-cols-subgrid col-span-2">Quantity</p>
          <p className="grid grid-cols-subgrid col-span-2">Total</p>
          <p className="grid grid-cols-subgrid col-span-1">Add</p>
          <p className="grid grid-cols-subgrid col-span-1">Remove</p>
        </div>
        <br />
        <hr className="h-[1px] bg-[#200125] border-none" />
        {products.map((item, index) => {
          if (cartProducts[item._id] > 0) {
            return (
              <>
                <div className="grid grid-cols-12 items-center text-[#200125]  font-semibold gap-1 sm:gap-5">
                  <img
                    className="sm:w-12 my-2 grid grid-cols-subgrid col-span-1"
                    src={item.image}
                    alt=""
                  />
                  <p className="my-2  text-black grid grid-cols-subgrid col-span-3 w-full justify-center md:whitespace-nowrap">
                    {item.name}
                  </p>
                  <p className="my-2 text-black grid grid-cols-subgrid col-span-2">
                    QR {item.price}
                  </p>
                  <p className="my-2 text-black grid grid-cols-subgrid col-span-2">
                    {cartProducts[item._id]}
                  </p>
                  <p className="my-2 text-black grid grid-cols-subgrid col-span-2">
                    QR {item.price * cartProducts[item._id]}
                  </p>
                  <p
                    onClick={() => addToCart(item._id)}
                    className="my-2 text-black grid grid-cols-subgrid col-span-1 cursor-pointer"
                  >
                    <FontAwesomeIcon
                      className=" cursor-pointer"
                      icon={faPlus}
                    />
                  </p>
                  <p
                    onClick={() => removeFromCart(item._id)}
                    className="my-2 text-black grid grid-cols-subgrid col-span-1 cursor-pointer"
                  >
                    <FontAwesomeIcon className=" cursor-pointer" icon={faX} />
                  </p>
                </div>
                <hr className="h-[1px] bg-[#777] border-none" />
              </>
            );
          }
        })}
        <div className="mt-20 flex flex-col-reverse md:flex-row justify-between gap-[max(12vw,20px)] ">
          <div className="flex-1 flex flex-col gap-5 ">
            <h2>Cart Totals</h2>
            <div>
              <div className="flex justify-between text-[#555]">
                <p>Subtotal</p>
                <p>QR {getTotalCartAmount()}</p>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-[#555]">
                <p>Cutu's Cuteness Tax</p>
                <p>QR {10}</p>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between text-[#200125]">
                <b>Total</b>
                <b>QR {getTotalCartAmount() + 10}</b>
              </div>
            </div>
            <button
              onClick={() => navigate("/order")}
              className="border-none bg-[#200125] text-white w-[max(15vw,200px)] py-3 rounded-md cursor-pointer"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
          <div className="flex-1 ">
            <div>
              <p className="text-[#200125]">
                If you have a promo code,Enter it here
              </p>
              <div className="mt-3 flex justify-between items-center bg-[#eaeaea] rounded-md">
                <input
                  className="bg-transparent border-none outline-none pl-3"
                  type="text"
                  placeholder="promo code"
                />
                <button className="w-[max(10vw,150px)] py-3 px-1 bg-[#200125] border-none text-white rounded-md">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
