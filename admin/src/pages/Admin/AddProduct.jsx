import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AdminContext } from "../../contexts/AdminContext";
import prodIcon from "../../assets/Product.png";
const AddProduct = () => {
  const [prodImg, setProdImg] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Pottery");
  const [description, setDescription] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!prodImg) {
        return toast.error("Image not selected");
      }
      const formData = new FormData();

      formData.append("image", prodImg);
      formData.append("name", name);
      formData.append("price", Number(price));
      formData.append("category", category);
      formData.append("description", description);

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "api/admin/add-product",
        formData,
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        setProdImg(false);
        setName("");
        setPrice("");
        setDescription("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {}
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="mt-10 mb-10 mr-10 ml-20 w-full pl-72"
    >
      <p className="mb-3 text-lg font-medium">Add Product</p>
      <div className="bg-white px-8 py-8 border rounded w-full  max-w-4xl max-h-[80vh] mx-3 overflow-y-scroll ">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="prod-img">
            <img
              className="w-16 bg-gray-100 rounded-sm cursor-pointer"
              src={prodImg ? URL.createObjectURL(prodImg) : prodIcon}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setProdImg(e.target.files[0])}
            type="file"
            id="prod-img"
            hidden
          />
          <p>
            Upload Product <br /> picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Product name</p>
              <input
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p>Product price</p>
              <input
                className="border rounded px-3 py-2"
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
          </div>
          <div className="w-full lg:flex-1 flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Category</p>
              <select
                className="border rounded px-3 py-2"
                name=""
                id=""
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="Pottery">Pottery</option>
                <option value="Crochet">Crochet</option>
                <option value="Illustration">Illustration</option>
                <option value="Sticker">Sticker</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mr-8">
          <p className="mt-4 mb-2">Product Description</p>
          <textarea
            className="w-full px-4 pt-2 border rounded "
            name=""
            id=""
            placeholder="Write about the product"
            row={5}
            required
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-[#e57373] px-10 py-3 mt-4 text-white rounded-full"
        >
          Add product
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
