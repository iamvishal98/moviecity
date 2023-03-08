import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { HiOutlineSearch } from "react-icons/hi";

import ContentWrapper from '../contentwrapper/ContentWrapper';
import logo from '../../assets/download.svg';
import './header.scss';
import clickOutside from '../../utils/helper/clickOutside';

const Header = () => {

  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // need to work
  const menuRef = useRef(null);
  const exceptioMenuRef = useRef(null);
  const searchref = useRef(null);
  const exceptioSearchRef = useRef(null);


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
    setShowSearch(false);

  };

  const navigationHandler = (type) => {
    navigate(`/explore/${type}`);
    setMobileMenu(false);
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true); 
  };

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
        navigate(`/search/${query}`);
        setTimeout(() => {
            setShowSearch(false);
        }, 1000);
    }
  };

  
  clickOutside(menuRef,() => {setMobileMenu(false)},exceptioMenuRef);
  clickOutside(searchref,() => {setShowSearch(false)},exceptioSearchRef);
  

  return (
    <div className={`header ${mobileMenu ? "mobileView" : ""} ${show}`} >
      <ContentWrapper>
        <div className="logo" onClick={() => navigate('/')}>
          <img src={logo} alt=''/>
        </div>
        
        <ul className="menuItems" ref={exceptioMenuRef}>
          <li className="menuItem" onClick={() => navigationHandler("movie")}>Movies</li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>Tv Shows</li>
          <li className="menuItem" onClick={() => openSearch()}  ref={searchref}>
             <HiOutlineSearch /> 
             </li>
        </ul>
        
        <div className="mobileMenuItems" ref={menuRef}>
          <HiOutlineSearch  onClick={() => openSearch()}/>
          {!mobileMenu ? 
            <SlMenu onClick={handleOpenMobileMenu} /> :
            <VscChromeClose onClick={handleOpenMobileMenu} />
          }
        </div>
      </ContentWrapper>
      {showSearch && (
                <div className="searchBar" ref={exceptioSearchRef}>
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search for a movie or tv show...."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose
                                onClick={() => setShowSearch(false)}
                            />
                        </div>
                    </ContentWrapper>
                </div>
            )}
    </div>
  )
}

export default Header