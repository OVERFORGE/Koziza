import "./App.css";
import React, { useContext, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ReactDOM from "react-dom";
import Category from "./pages/Category";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductPage from "./pages/ProductPage";
import ThisProduct from "./pages/ThisProduct";
import { useEffect } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import OrderPlaced from "./pages/OrderPlaced";
import MyOrders from "./pages/MyOrders";
import AboutUs from "./pages/AboutUs";
import { AppContext } from "./context/AppContext";

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
function App() {
  const [showLogin, setShowLogin] = useState(false);
  const { toggleMenu } = useContext(AppContext);
  return (
    <>
      <ToastContainer />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className={`${toggleMenu ? "fixed" : ""}`}>
        <Navbar setShowLogin={setShowLogin} />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:category" element={<ProductPage />} />
          <Route path="/this-product/:prodId" element={<ThisProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<OrderPlaced />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
