import React, { useContext, useRef, useState } from "react";
import Header from "../assets/Koziza_Header.png";
import CartCruiso from "../assets/cruiso_cart_koziza.png";
import "../App.css";
import { useNavigate, NavLink, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import loginButton from "../assets/Koziza Login.png";
import iconButton from "../assets/Koziza userIcon.png";
import menuButton from "../assets/menu-button.svg";
import KozizaLogo from "../assets/Koziza BG Logo.png";
const Navbar = ({ setShowLogin }) => {
  const [toggleIcon, setToggleIcon] = useState(false);

  const hamburgerMenu = useRef(null);
  const {
    totalCartProducts,
    token,
    setToken,
    setToggleMenu,
    toggleMenu,
    setAboutScroll,
  } = useContext(AppContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    toast("Logout Successfully");
  };
  const aboutSectionScroll = () => {
    setAboutScroll(true);
  };
  function myFunction() {
    menu.ClassList.toggle("change");
  }
  return (
    <div>
      <header>
        <img className={"header-img"} src={Header} alt="" />

        <NavLink to="/cart">
          <div className={"header-cart-holder"}>
            <img className={"header-cart"} src={CartCruiso} alt="" />
          </div>
          {totalCartProducts ? (
            <div className="absolute w-3 h-3  sm:w-5 sm:h-5 lg:w-8 lg:h-8  p-[1px] text-center items-center  top-0 lg:top-1  right-2 rounded-full bg-red-500 text-white text-[8px]  sm:text-xs lg:text-lg font-semibold ">
              {totalCartProducts}
            </div>
          ) : (
            <></>
          )}
        </NavLink>
        {!token ? (
          <button
            onClick={() => setShowLogin(true)}
            className="absolute top-[-8%] right-[7%] sm:top-[-3%] md:top-[0%] p-3 cursor-pointer"
          >
            <img
              className="w-7 sm:w-12 md:w-16 lg:w-20 "
              src={loginButton}
              alt=""
            />
          </button>
        ) : (
          <div
            className={`absolute top-1 sm:top-1  md:top-1  lg:top-2 xl:top-3 right-12 sm:right-20 md:right-24 lg:right-28 xl:right-36 cursor-pointer `}
            onClick={() => {
              setToggleIcon(!toggleIcon);
            }}
          >
            <img
              className={`w-6 sm:w-10 md:w-12 lg:w-14 xl:w-16 relative  ${
                toggleIcon
                  ? "right-[-65%] sm:right-[-47%] md:right-[-37%] lg:right-[-38%] xl:right-[-39.5%]"
                  : ""
              } `}
              src={iconButton}
              alt=""
            />
            <ul
              id="dropdownHover"
              aria-labelledby="dropdownHoverButton"
              className={` mt-1 px-2 py-1 sm:px-3 sm:py-2 xl:px-4 rounded-md bg-[#ffbeca] border border-[#200125] ${
                toggleIcon ? "block" : "hidden"
              } text-sm sm:text-md lg:text-lg xl:text-xl font-semibold font-mySmallFont`}
            >
              <li className=" mb-1 md:mb-2 xl:mb-3">
                <NavLink to={"/my-orders"}>
                  <p>Orders</p>
                </NavLink>
              </li>
              <hr />
              <li
                className="z-[999] cursor-pointer mt-1 md:mt-2 xl:mt-3"
                onClick={logout}
              >
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}

        <div className="font-mySmallFont absolute md:top-4 md:left-8 bg-[#FFFDEE] px-2 py-2 rounded-lg md:text-xs md:block hidden lg:text-lg lg:px-5 ">
          <ul className="flex flex-row md:gap-4 font-semibold ">
            <NavLink to="/">
              <li>Home</li>
            </NavLink>
            <NavLink to="/products">
              <li>Product</li>
            </NavLink>
            <NavLink>
              <li>Commission</li>
            </NavLink>

            <NavLink to="/about-us">
              <li>About us</li>
            </NavLink>
          </ul>
        </div>
      </header>

      {/* <div
        className={`w-full flex justify-center  p-2 mt-[-6.2%] sm:mt-[-2%] z-[1] bg-[#E57373] ${
          toggleMenu ? "mt-[-5%]" : ""
        } `}
      >
        <div
          className={`font-mySmallFont  flex flex-col justify-center z-[1]  w-[90%] rounded-sm mt-3 py-3 ${
            toggleMenu ? "bg-[#E57373]" : ""
          } `}
        >
          <button
            className={`py-1 px-3 font-bold text-lg  border border-[#E57373] bg-[#E57373] rounded  transition-all md:hidden ${
              toggleMenu ? "bg-[#E57373] text-[#200125]" : ""
            }`}
            onClick={() => setToggleMenu((prev) => !prev)}
          >
            Menu
          </button>
          <div
            className={`flex-col gap-4 text-sm text-[#200125]  ${
              toggleMenu ? "flex" : "hidden "
            }`}
          >
            <ul className="flex justify-center gap-2 font-semibold flex-col w-full text-center   p-2 mt-[-5%] cursor-pointer">
              <NavLink to="/" className={"w-full"}>
                <li className="mt-4">Home</li>
              </NavLink>
              <NavLink to="/products">
                <li>Product</li>
              </NavLink>
              <NavLink>
                <li>Commission</li>
              </NavLink>
              <NavLink to="/about-us">
                <li>About us</li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div> */}
      <div className={`${toggleMenu ? "" : ""}`}>
        <div
          className={`w-[100vw] h-[100vh]  z-[999] absolute  flex  duration-[0.5s] ease-in-out ${
            toggleMenu
              ? "top-0 translate-x-0 bg-[#00000090] fixed overflow-hidden"
              : "top-0 translate-x-[-66.7vw] "
          } `}
        >
          <div
            className={`w-2/3 bg-[#ffbeca] ${
              setToggleMenu ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col justify-start w-full h-full items-center my-4">
              <img src={KozizaLogo} className="w-8/12" alt="" />
              <div className="h-7/12 font-myFont text-3xl mt-6 text-center ">
                <ul>
                  <NavLink to="/">
                    <li className="mb-2">Home</li>
                  </NavLink>
                  <NavLink to="/products">
                    <li className="mb-2">Product</li>
                  </NavLink>
                  <NavLink>
                    <li className="mb-2">Commission</li>
                  </NavLink>

                  <NavLink to="/about-us">
                    <li className="mb-2">About us</li>
                  </NavLink>
                </ul>
              </div>
            </div>
          </div>
          <div
            className={`inline-block mt-[2px] ml-8 duration-[0.5s]  ease-in-out z-[999] ${
              toggleMenu ? "ml-[8px]" : ""
            }`}
            ref={hamburgerMenu}
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            <div
              className={`w-7 h-[4px] bg-[#FFFDEE] my-1 duration-[0.5s] ease-in-out rounded-md ${
                toggleMenu ? "translate-y-[8.3px] rotate-[-45deg] " : ""
              }`}
            ></div>
            <div
              className={`w-7 h-[4px] bg-[#FFFDEE] my-1 duration-[0.5s] ease-in-out rounded-md ${
                toggleMenu ? "opacity-0 " : ""
              }`}
            ></div>
            <div
              className={`w-7 h-[4px] bg-[#FFFDEE] my-1 duration-[0.5s] ease-in-out rounded-md ${
                toggleMenu ? "translate-y-[-8.3px] rotate-[45deg] " : ""
              }`}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
