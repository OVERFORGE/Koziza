import React from "react";

const PortfolioSection = ({ title, videolinks }) => {
  return (
    <div className="mt-20">
      <h1
        className="font-mySmallFont"
        style={{ fontSize: "48px", fontWeight: "900" }}
      >
        {title}
      </h1>
      <div className="mt-10 flex flex-wrap justify-between">
        {videolinks.map((link, index) => (
          <div key={index} id={index}>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${link.link}`}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioSection;
