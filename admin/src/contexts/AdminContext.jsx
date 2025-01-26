import { createContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState("");
  const [products, setProducts] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const getAllProducts = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "api/admin/all-products",
        {},
        { headers: { aToken } }
      );
      if (data.success) {
        setProducts(data.products);
        console.log(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    products,
    getAllProducts,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
