import React, { useContext, useEffect, useRef } from "react";
import Koziza_hero from "../assets/koziza_hero.png";
import Dark_Cloud_Koziza from "../assets/Dark_Cloud_Koziza.png";
import Light_Cloud_Koziza from "../assets/Light_Cloud_Koziza.png";
import Pottery from "../assets/Pottery_Koziza.png";
import Crochet from "../assets/Crochet_Koziza.png";
import Illustration from "../assets/Illustration_Koziza.png";
import Sticker from "../assets/Sticker_Koziza.png";
import Suffering_Koziza from "../assets/Suffering_Koziza.png";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import CustomWork from "../components/CustomWork";
function Home() {
  const navigate = useNavigate();
  const suffering = useRef(null);
  const { aboutScroll, setAboutScroll } = useContext(AppContext);
  const checkAboutScroll = () => {
    if (aboutScroll) {
      suffering.current.scrollIntoView();
      setAboutScroll(false);
    }
  };
  useEffect(() => {
    checkAboutScroll();
  }, [aboutScroll]);
  function adjustHeight() {
    const body = document.querySelector("#whole-body");
    const beforeElement = getComputedStyle(body, "::before");

    const bodyHeight = body.scrollHeight; // Total height of content
    const newBodyHeight = bodyHeight + (10 * bodyHeight) / 100;
    body.style.setProperty("--before-height", `${newBodyHeight}px`);
  }
  window.addEventListener("resize", adjustHeight);
  window.addEventListener("load", adjustHeight);
  window.addEventListener("scroll", adjustHeight);
  return (
    <div className="bg-[#ffbeca] pb-[15%] mb-[-10%] z-[-2]">
      <div id="whole-body">
        <div class="hero-section-container">
          {/* -----------------------------HERO SECTION----------------------------- */}
          <div class="hero-section">
            <div class="hero-left-container">
              <p class="cta-text cta-text-1">Art That Speaks</p>
              <p class="cta-text cta-text-2">Craft That Stays!</p>
              <div class="cta-button-container">
                <button
                  onClick={() => {
                    navigate("/products");
                  }}
                  class="cta-button"
                >
                  Shop the Collection
                </button>
              </div>
            </div>
            <div class="hero-right-container">
              <img src={Koziza_hero} alt=""></img>
            </div>
          </div>
          {/* -----------------------------CATEGORIES----------------------------- */}
          <div class="category-section">
            <h1>CATEGORY</h1>
            <div class="category-holder">
              <div
                class="category-card"
                onClick={() => {
                  navigate("/products/Pottery");
                }}
              >
                <img class="cloud-img" src={Dark_Cloud_Koziza} alt=""></img>
                <img class="cloud-icon" src={Pottery} alt=""></img>
                <p class="category-text">Pottery</p>
              </div>
              <div
                class="category-card light-card "
                onClick={() => {
                  navigate("/products/Crochet");
                }}
              >
                <img class="cloud-img" src={Light_Cloud_Koziza} alt=""></img>
                <img class="cloud-icon" src={Crochet} alt=""></img>
                <p class="category-text">Crochet</p>
              </div>
              <div
                class="category-card"
                onClick={() => {
                  navigate("/products/Illustration");
                }}
              >
                <img class="cloud-img" src={Dark_Cloud_Koziza} alt=""></img>
                <img class="cloud-icon" src={Illustration} alt=""></img>
                <p class="category-text">Illustration</p>
              </div>
              <div
                class="category-card light-card"
                onClick={() => {
                  navigate("/products/Sticker");
                }}
              >
                <img class="cloud-img" src={Light_Cloud_Koziza} alt=""></img>
                <img class="cloud-icon" src={Sticker} alt=""></img>
                <p class="category-text">Sticker</p>
              </div>
            </div>
          </div>
          {/* -----------------------------SUFFERING----------------------------- */}
          <div class="suffering-section" id="suffering" ref={suffering}>
            <h1>My Story</h1>
            <div class="suffering-content">
              <div class="suffering-left-container">
                <img src={Suffering_Koziza} alt=""></img>
              </div>
              <div class="suffering-right-container">
                <p class="suffering-text">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Voluptate quia quam eligendi nobis ipsa? Quam deserunt a
                  dolore? Similique, aliquam? Numquam ab expedita sapiente
                  reiciendis, beatae quos, sed cum accusamus ipsum quod placeat
                  harum ad blanditiis ex enim ut officiis tenetur illum
                  architecto, nemo aliquam doloremque laudantium ipsam. Ducimus
                  et excepturi possimus consectetur odio eligendi architecto
                  accusamus doloremque! Nulla quod omnis eveniet possimus dicta!
                  Quidem consequatur libero, illo nulla quasi non fugit, quaerat
                  sint odio asperiores atque neque? Facere ab cupiditate
                  praesentium vero odio hic optio velit accusantium, veritatis
                  doloribus aspernatur earum eaque. Odio aperiam delectus eius!
                  Dolores, tempore dignissimos?
                </p>
              </div>
            </div>
          </div>
          <CustomWork />
        </div>
      </div>
    </div>
  );
}

export default Home;
