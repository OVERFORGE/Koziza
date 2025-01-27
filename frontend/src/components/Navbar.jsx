import React, { useContext, useState } from "react";
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
const Navbar = ({ setShowLogin }) => {
  const [toggleIcon, setToggleIcon] = useState(false);
  const { totalCartProducts, token, setToken, setToggleMenu, toggleMenu } =
    useContext(AppContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
    toast("Logout Successfully");
  };
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
            className="absolute top-[-8%] right-[7%] sm:top-[-3%] md:top-[0%] p-3"
          >
            <img
              className="w-7 sm:w-12 md:w-16 lg:w-20 "
              src={loginButton}
              alt=""
            />
          </button>
        ) : (
          <div
            className={`absolute top-1 sm:top-1  md:top-1  lg:top-2 xl:top-3 right-12 sm:right-20 md:right-24 lg:right-28 xl:right-36 ${
              toggleIcon
                ? "right-10 sm:right-[72px] md:right-[84px] lg:right-[92px] xl:right-[125px]"
                : ""
            }`}
            onClick={() => {
              setToggleIcon(!toggleIcon);
            }}
          >
            <img
              className="w-6 sm:w-10 md:w-12 lg:w-14 xl:w-16"
              src={iconButton}
              alt=""
            />
            <ul
              id="dropdownHover"
              aria-labelledby="dropdownHoverButton"
              className={`z-[1] mt-1 px-3 py-2 rounded-md bg-[#ffbeca] border border-[#200125] ${
                toggleIcon ? "block" : "hidden"
              } text-md font-semibold font-mySmallFont`}
            >
              <li className=" mb-2 ">
                <NavLink to={"/my-orders"}>
                  <p>Orders</p>
                </NavLink>
              </li>
              <hr />
              <li className="cursor-pointer mt-2" onClick={logout}>
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
              <li>Custom Work</li>
            </NavLink>
            <Link to="#suffering">
              <li>About Us</li>
            </Link>
          </ul>
        </div>
      </header>
      <div
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
                <li>Custom Work</li>
              </NavLink>
              <NavLink>
                <li>About Us</li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
