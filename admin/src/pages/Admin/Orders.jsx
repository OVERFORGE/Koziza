import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
import Box from "../../assets/box.png";
const Orders = () => {
  const { backendUrl } = useContext(AdminContext);
  const [orders, setOrders] = useState([]);
  const fetchAllOrders = async () => {
    const response = await axios.get(backendUrl + "api/order/list");
    if (response.data.success) {
      setOrders(response.data.data);
    } else {
      toast.error(response.data.message);
    }
  };
  const statusHandler = async (event, orderId) => {
    const response = await axios.post(backendUrl + "api/order/status", {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchAllOrders();
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="pl-96 pr-52 py-20">
      <h3 className="font-semibold text-3xl">Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-8 bg-[#200125] border border-[#200125] p-5 my-8 text-sm text-[#FFFDEE]"
          >
            <img src={Box} alt="" />
            <div>
              <p className="font-semibold">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="font-semibold mt-8 mb-1">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="mb-2">
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <p>Items:{order.items.length}</p>
            <p>QAR {order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="bg-[#FFFDEE] border border-[#ffbeca] text-[#200125] w-[max(10vw,120px)] p-2 outline-none"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Payment Done">Payment Done</option>
              <option value="Order Received">Order Received</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
