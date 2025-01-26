import { useContext } from "react";
import { AdminContext } from "../contexts/AdminContext";
import { useNavigate } from "react-router-dom";
import profileUser from "../assets/profile-user.png";
const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();
  return (
    <>
      <div className="right-pane">
        <header>
          <div class="page-name">Dashboard</div>
          <div class="greeting-container">
            <p>Hello Cutu</p>
            <img src={profileUser} alt="" />
          </div>
        </header>
      </div>
    </>
  );
};

export default Navbar;
