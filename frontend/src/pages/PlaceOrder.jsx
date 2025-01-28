import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    token,
    products,
    cartProducts,
    backendUrl,
    toggleMenu,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    products.map((item) => {
      if (cartProducts[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartProducts[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount(),
    };
    let response = await axios.post(backendUrl + "api/order/place", orderData, {
      headers: { token },
    });
    if (response.data.success) {
      console.log(response.data.success);
      navigate("/verify");
    } else {
      alert("Error");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
      toast("Add Products to cart");
    }
  }, [token]);
  return (
    <div
      className={`font-mySmallFont mt-[-200px] mb-[-165px] pt-[150px] pb-[220px] md:pt-[240px] md:pb-[240px] md:px-40 sm:px-20 px-10 sm:text-md text-[10px] md:text-base bg-[#ffbeca] ${
        toggleMenu ? "pt-[270px] mt-[-260px]" : ""
      } `}
    >
      <form
        onSubmit={placeOrder}
        className="flex md:flex-row flex-col items-start justify-center md:justify-between gap-12 mt-[100px] "
      >
        <div className="w-full max-w-[max(30%,500px)]">
          <p className="text-3xl font-semibold mb-4">Customer Information</p>
          <div className="flex gap-3">
            <input
              required
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              className="mb-3 w-full px-3 py-2 border border-[#200125] outline-[#200125] rounded-md"
              type="text"
              placeholder="First Name"
            />
            <input
              required
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              className="mb-3 w-full px-3 py-2 border border-[#200125] outline-[#200125] rounded-md"
              type="text"
              placeholder="Last Name"
            />
          </div>
          <input
            required
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            className="mb-3 w-full px-3 py-2 border border-[#200125] outline-[#200125] rounded-md"
            type="email"
            placeholder="Email Address"
          />

          <div className="flex gap-3">
            <input
              required
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              className="mb-3 w-full px-3 py-2 border border-[#200125] outline-[#200125] rounded-md"
              type="text"
              placeholder="City"
            />
            <input
              required
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              className="mb-3 w-full px-3 py-2 border border-[#200125] outline-[#200125] rounded-md"
              type="text"
              placeholder="State"
            />
          </div>
          <div className="flex gap-3">
            <input
              required
              name="zipcode"
              onChange={onChangeHandler}
              value={data.zipcode}
              className="mb-3 w-full px-3 py-2 border border-[#200125] outline-[#200125] rounded-md"
              type="text"
              placeholder="Zip code"
            />
            <input
              required
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              className="mb-3 w-full px-3 py-2 border border-[#200125] outline-[#200125] rounded-md"
              type="text"
              placeholder="Country"
            />
          </div>
          <input
            required
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            className="mb-3 w-full px-3 py-2 border border-[#200125] outline-[#200125] rounded-md"
            type="text"
            placeholder="Phone"
          />
        </div>
        <div className="w-full max-w-[max(40%,500px)]">
          <div className="flex-1 flex flex-col gap-5 ">
            <h2 className="text-2xl font-bold">Cart Totals</h2>
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
              className="border-none bg-[#200125] text-white w-[max(10vw,160px)] md:w-[max(15vw,200px)] py-3 rounded-md cursor-pointer mt-8 mb-2"
              type="submit"
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </form>
      <div className="">
        <span className="font-extrabold">T&C:</span> The customers are suppose
        to collect the product from the location provided in the order
        confirmation mail
      </div>
    </div>
  );
};

export default PlaceOrder;
