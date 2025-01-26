import React, { useContext } from "react";
import { AdminContext } from "../contexts/AdminContext";
import Logo from "../assets/Koziza_Logo.png";
import Dashboard from "../assets/dashboard.png";
import Logout from "../assets/logout.png";
import Category from "../assets/category.png";
import Product from "../assets/product.png";
import User from "../assets/user.png";
import Order from "../assets/orders.png";
import Page from "../assets/page.png";
import { useNavigate, NavLink } from "react-router-dom";

const Sidebar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();
  const logout = () => {
    navigate("/");
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
  };
  return (
    <div className="min-h-screen bg-white border-r">
      {aToken && (
        <>
          <div class="left-pane">
            <div class="side-bar">
              <div class="logo-container">
                <img src={Logo} alt="" />
              </div>
              <div class="menu-container">
                <ul>
                  <NavLink to="/admin-dashboard">
                    <li>
                      <img src={Dashboard} alt="" />
                      <p>Dashboard</p>
                    </li>
                  </NavLink>
                  <NavLink to="/view-product">
                    <li>
                      <img src={Category} alt="" />
                      <p>View Products</p>
                    </li>
                  </NavLink>
                  <NavLink to="/add-product">
                    <li>
                      <img src={Product} alt="" />
                      <p>Add Products</p>
                    </li>
                  </NavLink>
                  <NavLink to="/all-user">
                    <li>
                      <img src={User} alt="" />
                      <p>Users</p>
                    </li>
                  </NavLink>
                  <NavLink to="/orders">
                    <li>
                      <img src={Order} alt="" />
                      <p>Orders</p>
                    </li>
                  </NavLink>

                  <li>
                    <img src={Page} alt="" />
                    <p>Static pages</p>
                  </li>
                </ul>
              </div>
              <div class="logout-container">
                <li onClick={logout}>
                  <img src={Logout} alt="" />
                  <p>Log Out</p>
                </li>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
