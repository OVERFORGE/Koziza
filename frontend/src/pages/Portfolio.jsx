import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import PortfolioSection from "../components/PortfolioSection";

const Portfolio = () => {
  const { toggleMenu } = useContext(AppContext);
  return (
    <div
      className={`font-mySmallFont mt-[-200px] mb-[-160px]  pt-[240px] pb-[240px] text-[10px] md:text-base bg-[#ffbeca] ${
        toggleMenu ? "pt-[270px] mt-[-260px]" : ""
      } `}
    >
      <div className="md:px-40 sm:px-20 px-10 sm:text-md text-[#200125]">
        <h1
          className="font-myFont "
          style={{ fontSize: "64px", fontWeight: "900" }}
        >
          My Portfolio
        </h1>
        <PortfolioSection
          title={"Cutu is cutest"}
          videolinks={[
            {
              link: "GhVNTASkjEg?si=P_ml8EGm4iBW9NvS",
              videoTitle: "",
              description: "",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Portfolio;
