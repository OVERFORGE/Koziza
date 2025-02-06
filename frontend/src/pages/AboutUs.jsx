import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import AboutUsImg from "../assets/Koziza About Us Img.png";
const AboutUs = () => {
  const { toggleMenu } = useContext(AppContext);
  return (
    <div
      className={`font-mySmallFont mt-[-200px] mb-[-160px]  pt-[240px] pb-[240px] text-[10px] md:text-base bg-[#ffbeca] ${
        toggleMenu ? "pt-[270px] mt-[-260px]" : ""
      } `}
    >
      <div className="md:px-40 sm:px-20 px-10 sm:text-md text-[#200125]">
        <div className=" p-10 rounded-md flex flex-col md:flex-row bg-[#E57373] gap-3">
          <div className="w-full md:w-1/2">
            <img src={AboutUsImg} alt="" />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <p className="font-myFont md:text-5xl">Know more about me?</p>
            <p className="md:mt-10 p-2 text-lg font-medium ">
              Hey BBG's I am{" "}
              <span className="font-semibold text-xl">Sara Khankan</span> from
              VCUQ. Blah Blah
            </p>
            <p className="text-2xl font-myFont ">Liked my work ?</p>
            <p>
              <span>Check my IG at</span>{" "}
              <span className="underline">cutukoziza</span>
            </p>
            <p>
              Email me at : <span>CutuEmail@cutu.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
