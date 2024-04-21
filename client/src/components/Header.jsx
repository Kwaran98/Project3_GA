import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Images/GA_logo.png';
import {FaBars} from "react-icons";
import {AiOutlineClose} from "react-icons/ai";

const Header = () => {
  return (
    <nav>
        <div className="container nav__container">
            <Link to="/" className="nav__logo">
                <img src= {Logo} alt="Navbar Logo" />
            </Link>
            <ul className='nav__menu'>
                <li><Link to="/profile">Alumni</Link></li>
                <li><Link to="/create">Create Post</Link></li>
                <li><Link to="/authors">Authors</Link></li>
                <li><Link to="/logout">Logout</Link></li>
                {/* In this case we are assuming that we alr have an account and we have logged in */}
            </ul>
            <button className="nav__toggle-btn">
                <AiOutlineClose />
            </button>  
        </div>
    </nav>
  )
}

export default Header
