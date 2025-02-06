import React from "react";
import axios from "axios";
import { createContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState("");
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState({});
  const [totalCartProducts, setTotalCartProducts] = useState(0);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [aboutScroll, setAboutScroll] = useState(false);
  const navigate = useNavigate();
  const buyNow = async (itemId) => {
    addToCart(itemId);
    navigate("/cart");
  };

  const addToCart = async (itemId) => {
    if (!cartProducts[itemId]) {
      setCartProducts((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartProducts((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      const res = await axios.post(
        backendUrl + "api/cart/add",
        { itemId },
        { headers: { token } }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    }
  };
  const removeFromCart = async (itemId) => {
    setCartProducts((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        backendUrl + "api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  useEffect(() => {
    findTotalCartProduct();
  }, [cartProducts]);

  const findTotalCartProduct = async () => {
    const total = Object.values(cartProducts).reduce(
      (sum, quantity) => sum + quantity,
      0
    );
    setTotalCartProducts(total);
  };

  const getProductsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      backendUrl + "api/cart/get",
      {},
      { headers: { token } }
    );
    setCartProducts(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
    getProductsData();
  }, []);
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartProducts) {
      if (cartProducts[item] > 0) {
        const itemInfo = products.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartProducts[item];
      }
    }
    return totalAmount;
  };
  const value = {
    products,
    cartProducts,
    loadCartData,
    totalCartProducts,
    setCartProducts,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    backendUrl,
    token,
    setToken,
    toggleMenu,
    setToggleMenu,
    buyNow,
    aboutScroll,
    setAboutScroll,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
