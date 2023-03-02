import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineSearch } from "react-icons/hi";
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
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // need to work
  const searchRef=useRef(null);
  const exceptionSearchRef = useRef(null);
  const menuRef = useRef(null);


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

  const handleShowSearch = () => {
    setMobileMenu(false);
    setShowSearch(!showSearch);
  };

  const handleOpenMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    navigate(`/explore/${type}`);
    setMobileMenu(false);
    setShowSearch(false);
  };

  const searchQueryHandler = (event) => {
    if(event.key === "Enter" && query.length >0){
        navigate(`/search/${query}`);
    }
    setTimeout(() => {
      setShowSearch(false)
    },1000);
  };

  //clickOutside(searchRef,() => {setShowSearch(false)},exceptionSearchRef);
  //clickOutside(menuRef,() => {setMobileMenu(false)});
  

  return (
    <div className={`header ${mobileMenu ? "mobileView" : ""} ${show}`} ref={menuRef}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate('/')}>
          <img src={logo} alt=''/>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>Movies</li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>Tv Shows</li>
          <li className="menuItem">
            <div className="searchIcon" ref={searchRef}>
              <HiOutlineSearch onClick={handleShowSearch}/>
            </div>
          </li>
        </ul>
        <div className="mobileMenuItems">
          <div className="searchIcon" ref={searchRef}>
            <HiOutlineSearch onClick={handleShowSearch}/>
          </div>
          {!mobileMenu ? 
            <SlMenu onClick={handleOpenMobileMenu} /> :
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          }
        </div>
      </ContentWrapper>
     {showSearch && <div className="searchBar">
          <ContentWrapper>
            <div className="searchInputHeader" ref={exceptionSearchRef}>
              <input 
                  type='text' 
                  placeholder='search for movie or tv show' 
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
      </div>}
    </div>
  )
}

export default Header