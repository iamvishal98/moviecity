import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";

import ContentWrapper from '../contentwrapper/ContentWrapper';
import logo from '../../assets/download.svg';
import './header.scss';
import clickOutside from '../../utils/helper/clickOutside';

const Header = () => {

  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // need to work
  const menuRef = useRef(null);
  const exceptioMenuRef = useRef(null);


  const controlNavbar = () => {
    if(window.scrollY>200) {
       if(window.scrollY > lastScrollY && !mobileMenu){
        setShow("hide")
       }else {
        setShow("show")
       }
      }else {
        setShow("top")
      }
      setLastScrollY(window.scrollY);
  };

  useEffect(()=> {
    window.addEventListener("scroll",controlNavbar)
    return () => {window.removeEventListener("scroll",controlNavbar)}
  },[lastScrollY]);



  const handleOpenMobileMenu = () => {
    setMobileMenu(!mobileMenu);

  };

  const navigationHandler = (type) => {
    navigate(`/explore/${type}`);
    setMobileMenu(false);
  };


  clickOutside(menuRef,() => {setMobileMenu(false)},exceptioMenuRef);
  

  return (
    <div className={`header ${mobileMenu ? "mobileView" : ""} ${show}`} >
      <ContentWrapper>
        <div className="logo" onClick={() => navigate('/')}>
          <img src={logo} alt=''/>
        </div>
        <ul className="menuItems" ref={exceptioMenuRef}>
          <li className="menuItem" onClick={() => navigationHandler("movie")}>Movies</li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>Tv Shows</li>
        </ul>
        <div className="mobileMenuItems" ref={menuRef}>
          {!mobileMenu ? 
            <SlMenu onClick={handleOpenMobileMenu} /> :
            <VscChromeClose onClick={handleOpenMobileMenu} />
          }
        </div>
      </ContentWrapper>
    </div>
  )
}

export default Header