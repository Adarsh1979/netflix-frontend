import "./navbar.scss";
import React, { useContext, useState } from "react";
import { Notifications, Search, ArrowDropDown } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { dispatch } = useContext(AuthContext);

  onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
  };

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png"
              alt="netflix-logo"
            ></img>
          </Link>
          <Link to="/" className="link">
            <span className="navbarmainlinks">Home</span>
          </Link>
          <Link to="/series" className="link">
            <span className="navbarmainLinks">TV Shows</span>
          </Link>
          <Link to="/movies" className="link">
            <span className="navbarmainLinks">Movies</span>
          </Link>
        </div>

        <div className="right">
          <Search className="icon mobileExclude" />
          <span className="icon mobileExclude">Kids</span>
          <Notifications className="icon mobileExclude" />
          <img
            className="proPic"
            src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
            alt="avatar.png"
          ></img>
          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <Link to="/login" className="link">
                <span onClick={() => dispatch(logout())}>Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
