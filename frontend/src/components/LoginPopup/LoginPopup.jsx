import React, { useContext, useEffect, useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
const LoginPopup = ({ setShowLogin }) => {
  const { backendUrl, token, setToken, loadCartData } = useContext(AppContext);
  const [currentState, setCurrentState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = backendUrl;
    if (currentState === "Login") {
      newUrl += "api/user/login";
    } else {
      newUrl += "api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
      if (currentState === "Login") {
        console.log("logged In");
        toast.success("Logged In Successfully");
        loadCartData(response.data.token);
      }
      if (currentState === "Sign Up") {
        console.log("Signed Up Successfully");
        toast.success("Signed Up Successfully");
      }
    }
  };
  //   useEffect(() => {
  //     console.log(data);
  //   }, [data]);
  return (
    <div className="absolute z-[1] w-[100%] h-[100%] bg-[#00000090] grid">
      <form
        onSubmit={onLogin}
        className="place-self-center w-[max(23vw,330px)] text-[#333] bg-[#FFBECA] flex flex-col gap-6 py-6 px-7 border border-[#200125] rounded-lg text-md"
      >
        <div className="flex justify-between items-center text-black">
          <h2 className="font-bold text-lg text-[#200125]">{currentState}</h2>
          <FontAwesomeIcon
            className="w-4 cursor-pointer"
            onClick={() => setShowLogin(false)}
            icon={faX}
          />
        </div>
        <div className="flex flex-col flex-col gap-5 ">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              className="outline-none border border-solid border-[#200125] p-2 rounded-md"
              type="text"
              placeholder="Your name"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              required
            />
          )}

          <input
            className="outline-none border border-solid border-[#200125] p-2 rounded-md"
            type="email"
            placeholder="Your email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            required
          />
          <input
            className="outline-none border border-solid border-[#200125] p-2 rounded-md"
            name="password"
            type="password"
            placeholder="Password"
            onChange={onChangeHandler}
            value={data.password}
            required
          />
        </div>
        <button
          type="submit"
          className="border-none bg-[#200125] p-2 rounded-md text-white text-lg cursor-pointer"
        >
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>
        {currentState === "Login" ? (
          <p>
            Create a new Account?{" "}
            <span
              className="font-semibold cursor-pointer text-[#200125]"
              onClick={() => setCurrentState("Sign Up")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              className="font-semibold cursor-pointer text-[#200125]"
              onClick={() => setCurrentState("Login")}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
