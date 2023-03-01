import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

import ContentWrapper from '../contentwrapper/ContentWrapper';
import logo from '../../assets/movie-city.svg';
import './header.scss';

const Header = () => {

  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleShowSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);

  };

  const handleOpenMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);

  };
  

  return (
    <div className={`header ${mobileMenu ? "mobileView" : ""}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt=''/>
        </div>
        <ul className="menuItems">
          <li className="menuItem">Movies</li>
          <li className="menuItem">Tv Shows</li>
          <li className="menuItem">
            <HiOutlineSearch />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch />
          {!mobileMenu ? 
            <SlMenu onClick={handleOpenMobileMenu}/> : 
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          }
        </div>
      </ContentWrapper>
    </div>
  )
}

export default Header