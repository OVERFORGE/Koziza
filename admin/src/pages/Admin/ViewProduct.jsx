import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
const ViewProduct = () => {
  const { backendUrl, products, aToken, getAllProducts } =
    useContext(AdminContext);
  const [editedProductId, setEditedProductId] = useState({});
  const [prodImg, setProdImg] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Pottery");
  const [description, setDescription] = useState("");
  const [editedImages, setEditedImages] = useState({});
  const saveFunction = async (event) => {
    event.preventDefault();

    try {
      const updatedName = name.trim() === "" ? editedProductId.name : name;
      const updatedPrice =
        price === "" || isNaN(Number(price))
          ? editedProductId.price
          : Number(price);
      const updatedCategory =
        category.trim() === "Pottery" ? editedProductId.category : category;
      const updatedDescription =
        description.trim() === "" ? editedProductId.description : description;

      const formData = new FormData();
      formData.append("_id", editedProductId._id);
      formData.append(
        "image",
        editedImages[editedProductId._id] || editedProductId.image
      ); //prodImg
      formData.append("name", updatedName);
      formData.append("price", updatedPrice);
      formData.append("category", updatedCategory);
      formData.append("description", updatedDescription);

      const { data } = await axios.post(
        backendUrl + "api/admin/change-detail",
        formData,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });
      setEditedImages((prev) => {
        const newImages = { ...prev };
        delete newImages[editedProductId._id];
        return newImages;
      });
      setName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setProdImg(null);
      setEditedProductId(null);
    } catch (error) {
      console.error(error);
    }
  };
  const deleteProduct = async (id) => {
    try {
      const { data } = await axios.post(
        backendUrl + "api/admin/delete-product",
        { id },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (productId, file) => {
    setEditedImages((prev) => ({
      ...prev,
      [productId]: file,
    }));
  };

  const enableEdit = async (item) => {
    if (editedProductId === item) {
      setEditedProductId(null);
    } else {
      setEditedProductId(item);
      setName(item.name || "");
      setPrice(item.price || "");
      setCategory(item.category || "Pottery");
      setDescription(item.description || "");
      setProdImg(null);
    }
  };
  useEffect(() => {
    if (aToken) {
      getAllProducts();
    }
  }, [aToken]);
  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll pl-72">
      <h1 className="text-lg font-medium">All Products</h1>
      <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
        {products.map((item, index) => (
          <div
            className="border border-[#ffbeca] rounded-xl max-w-72 overflow-hidden cursor-pointer group"
            key={index}
          >
            <label htmlFor="prod-img">
              <img
                className="bg-indigo-50 w-full group-hover:bg-primary transition-all duration-500"
                src={
                  prodImg
                    ? URL.createObjectURL(editedImages[item._id])
                    : item.image
                }
                alt=""
              />
            </label>
            {editedProductId === item ? (
              <form onSubmit={saveFunction} className="p-4">
                <input
                  type="file"
                  id="prod-img"
                  hidden
                  onChange={(e) =>
                    handleImageChange(item._id, e.target.files[0])
                  }
                />
                <input
                  type="text"
                  className="text-gray-600 text-md font-medium border px-2 py-1 rounded-md mb-2"
                  placeholder={"name: " + item.name}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <select
                  className="text-gray-600 text-sm font-medium border px-2 py-1 rounded-md mb-2"
                  placeholder={"Old Category: " + item.category}
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                >
                  <option value="Pottery">Pottery</option>
                  <option value="Crochet">Crochet</option>
                  <option value="Illustration">Illustration</option>
                  <option value="Sticker">Sticker</option>
                </select>
                <input
                  type="number"
                  className="text-gray-600 text-xs font-medium border px-2 py-1 rounded-md mb-2"
                  placeholder={"Old price: QR" + item.price}
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
                <textarea
                  className="text-gray-600 w-60 text-xs font-medium border px-2 py-1 rounded-md mb-2"
                  row={10}
                  columns={10}
                  placeholder={item.description}
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                ></textarea>
                <div className="p-4 flex gap-3 ">
                  <button
                    type="submit"
                    className={`w-32  p-2 rounded-md ${
                      editedProductId === item
                        ? " bg-green-500 text-white"
                        : "bg-[#ffbeca] text-[#990030]"
                    }`}
                  >
                    {editedProductId === item ? "Save" : "Edit"}
                  </button>
                  <button
                    type="button"
                    className="w-32 bg-red-400 p-2 rounded-md text-white"
                    onClick={enableEdit}
                  >
                    {editedProductId === item ? "Cancel" : "Delete"}
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="p-4">
                  <p className="text-neutral-800 text-lg font-medium">
                    {item.name}
                  </p>

                  <p className="text-zinc-600 text-sm">{item.category}</p>
                  <p className="text-neutral-800 text-md font-medium">
                    QR {item.price}
                  </p>
                  <p className="text-zinc-600 text-sm">{item.description}</p>
                </div>
                <div className="p-4 flex gap-3 ">
                  <button
                    type="submit"
                    onClick={() => {
                      enableEdit(item);
                    }}
                    className={`w-32  p-2 rounded-md ${
                      editedProductId === item._id
                        ? " bg-green-500 text-white"
                        : "bg-[#ffbeca] text-[#990030]"
                    }`}
                  >
                    {editedProductId === item._id ? "Save" : "Edit"}
                  </button>
                  <button
                    type="button"
                    className="w-32 bg-red-400 p-2 rounded-md text-white"
                    onClick={() => deleteProduct(item._id)}
                  >
                    {editedProductId === item._id ? "Cancel" : "Delete"}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewProduct;
