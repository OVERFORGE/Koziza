import React from "react";
import DmMeBlob from "../assets/Koziza Commissions Img.png";
const CustomWork = () => {
  return (
    <div className="mt-[-60px] sm:mt-0">
      <h1 className="mb-5 text-3xl sm:text-5xl text-center">
        Get Custom Products
      </h1>
      <div className="relative flex w-full flex-col sm:flex-row  items-center justify-center h-[70%]">
        <img className="w-10/12 sm:w-5/12" src={DmMeBlob} alt="" />
        <div className="koziza-blob">Hello</div>
      </div>
    </div>
  );
};

export default CustomWork;
