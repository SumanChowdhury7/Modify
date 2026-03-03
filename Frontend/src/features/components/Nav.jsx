import { useState, useRef, useEffect } from "react";
import { FiMenu, FiUser, FiLogOut } from "react-icons/fi";
import "./style/nav.scss";
import { useAuth } from "../auth/hooks/useAuth";
import { useNavigate } from "react-router";

const Navbar = () => {
    const {handleLogout, loading} = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const navigate = useNavigate()
    

  const logoutHandle = async ()=>{
    await handleLogout();
    navigate('/')
  }

  // close popup when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <nav className="navbar">
      <div
      onClick={()=>{
        navigate('/')
      }}
      className="logo">Moodify</div>

      <div className="menu-wrapper" ref={menuRef}>
        <FiMenu
          className="menu-icon"
          onClick={() => setOpen(!open)}
        />

        {open && (
          <div className="popup">
            <div className="popup-item">
              <FiUser />
              <span>Profile</span>
            </div>
            <div
            onClick={logoutHandle}
            className="popup-item logout">
              <FiLogOut />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;