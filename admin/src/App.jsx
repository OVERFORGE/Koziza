import "./App.css";
import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import Login from "./pages/Login";
import { AdminContext } from "./contexts/AdminContext";
import Dashboard from "./pages/Admin/Dashboard";
import AddProduct from "./pages/Admin/AddProduct";
import AllUser from "./pages/Admin/AllUser";
import Orders from "./pages/Admin/Orders";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import ViewProduct from "./pages/Admin/viewProduct";
function App() {
  const { aToken } = useContext(AdminContext);
  console.log(aToken);
  return aToken ? (
    <>
      <ToastContainer />
      <div className="flex items-start min-w-full">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Navbar />
          <Routes>
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/view-product" element={<ViewProduct />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/all-user" element={<AllUser />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>
    </>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
}

export default App;
