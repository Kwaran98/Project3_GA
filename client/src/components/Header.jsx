import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../Images/GA_logo.png";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

import { UserContext } from "../context/userContext";

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(
    window.innerWidth > 800 ? true : false
  );

  const { currentUser } = useContext(UserContext);

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  };
  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo" onClick={closeNavHandler}>
          <img src={Logo} alt="Navbar Logo" />
        </Link>
        {currentUser?.id && isNavShowing && (
          <ul className="nav__menu">
            <li>
              <Link to="/profile/:id" onClick={closeNavHandler}>
                {currentUser?.name}
              </Link>
            </li>
            <li>
              <Link to="/create" onClick={closeNavHandler}>
                Create Post
              </Link>
            </li>
            <li>
              <Link to="/authors" onClick={closeNavHandler}>
                Authors
              </Link>
            </li>
            <li>
              <Link to="/logout" onClick={closeNavHandler}>
                Logout
              </Link>
            </li>
            {/* In this case we are assuming that we alr have an account and we have logged in */}
          </ul>
        )}
        {!currentUser?.id && isNavShowing && (
          <ul className="nav__menu">
            <li>
              <Link to="/authors" onClick={closeNavHandler}>
                Authors
              </Link>
            </li>
            <li>
              <Link to="/logout" onClick={closeNavHandler}>
                Login
              </Link>
            </li>
            {/* In this case we are assuming that we alr have an account and we have logged in */}
          </ul>
        )}
        <button
          className="nav__toggle-btn"
          onClick={() => setIsNavShowing(!isNavShowing)}
        >
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
