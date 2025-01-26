import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThanksImage from "../assets/Koziza Shopping Thanks.png";
const OrderPlaced = () => {
  const [timer, setTimer] = useState(10);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/my-orders");
    }, 10000);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);
  return (
    <div className=" mt-[-200px] mb-[-200px]  pt-[240px] pb-[240px] px-8 md:px-10 lg:px-24 bg-[#ffbeca] flex flex-col items-center w-full ">
      <div className="relative w-full flex flex-col items-center">
        <img className="w-full md:w-1/2" src={ThanksImage} alt="" />
        <p className="font-mySmallFont font-semibold absolute top-[10%] left-[60%] md:left-[54.5%]  text-[16px] sm:text-[32px] md:text-[20px] lg:text-[30px]">
          <span className="block">Thx. for </span>
          <span className="block">Shoppin, Besite</span>
        </p>
      </div>

      <p className="font-mySmallFont text-lg font-medium">
        You'll be forwarded to the next page in{" "}
        <span className="font-semibold">{timer}</span> seconds.
      </p>
    </div>
  );
};

export default OrderPlaced;
