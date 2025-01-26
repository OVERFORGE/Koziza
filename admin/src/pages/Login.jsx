import React, { useContext, useState } from "react";
import { AdminContext } from "../contexts/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import "../App.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(backendUrl + "api/admin/login", {
        email,
        password,
      });
      if (data.success) {
        localStorage.setItem("aToken", data.token);
        setAToken(data.token);
      } else {
        toast.error(data.message);
      }
    } catch (error) {}
  };
  return (
    <div className="container">
      <h2>ADMIN PANEL</h2>
      <div class="login-container">
        <div class="line-one">LOGIN</div>
        <form onSubmit={onSubmitHandler} class="login-form" action="">
          <div class="col">
            <label for="username">Email:</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              id="username"
              name="username"
              required
              placeholder="Username"
            />
          </div>
          <div class="col">
            <label for="password">Password:</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              id="password"
              name="password"
              required
              placeholder="Password"
            />
          </div>
          <div class="login-button-container">
            <button>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
