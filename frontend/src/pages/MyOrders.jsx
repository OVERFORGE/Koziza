import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import box from "../assets/box.png";
const MyOrders = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [data, setData] = useState([]);
  const fetchOrders = async () => {
    const response = await axios.post(
      backendUrl + "api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div className="font-mySmallFont py-12 px-5 sm:px-12 md:px-24 bg-[#ffbeca] mt-[-200px] mb-[-200px]  pt-[240px] pb-[240px]">
      <h2 className="md:text-2xl font-bold">My Orders</h2>
      <div className="flex flex-col gap-5 mt-8 ">
        {data.map((order, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr_1fr] md:grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center gap-1 md:gap-8 text-xs md:text-sm py-3 px-5 text-[#FFFDEE] bg-[#200125] border-[#200125] border rounded-md"
            >
              <img className="w-[50px] " src={box} alt="" />
              <p className="  ">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className=" ">QR {order.amount}.00</p>
              <p className=" ">Items: {order.items.length}</p>
              <p className=" ">
                <span className="text-[#990030]">&#x25cf;</span>{" "}
                <b className="font-medium ">{order.status}</b>
              </p>
              <button
                onClick={fetchOrders}
                className="border-none py-3 rounded-md bg-[#FFFDEE] cursor-pointer text-[#990030] font-semibold hover:bg-[#990030] hover:text-[#FFFDEE] transition-all duration-300"
              >
                Track Order
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
