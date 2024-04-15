import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, useLocation ,useNavigate} from "react-router-dom";
import apfelhersLogo from "../../assets/SVG/apfelherz_logo.svg";
import {  useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { Box, Container } from "@mui/material";
import { Close } from "@mui/icons-material";
import menuicon from "../../assets/SVG/menuicon.svg";
import "../../styles/header.scss";
// @ts-ignore
import * as Scroll from "react-scroll";
function Header() {
  const [navbarContent, setNavbarContent] = useState([]);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );
  const [menu, setMenu] = useState(false);
  const scroller = Scroll.scroller;
  const location = useLocation();
  const navigate = useNavigate();

  const menuRef = useRef(null);

  const fetchNavbarContent = async () => {
    try {
      let response: any = await axios.get(
        `https://cms.apfelherz.com/api/navbar-contents?${
          currentLanguage === "English" ? "locale=en" : "locale=de"
        }`
      );

      setNavbarContent(response?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  // const handleChange = (event: SelectChangeEvent) => {
  //   setLanguage(event.target.value as string);
  //   dispatch(setCurrentLanguage(event.target.value));
  // };

  const handleMenuToggle = () => {
    setMenu(!menu);
  };

  const handleClickOutsideMenu = (event: MouseEvent) => {
    if (
      menuRef.current &&
      !(menuRef.current as any).contains(event.target as Node)
    ) {
      setMenu(false);
    }
  };

  useEffect(() => {
    fetchNavbarContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideMenu);

    return () => {
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, []);


  useEffect(() => {
    window.scrollTo(0, 0);
    setMenu(false);
  }, [location.pathname]);

  const goToPageAndScroll = async (selector: string) => {
    await navigate("/");

    await scroller.scrollTo(selector, {
      duration: 300,
      smooth: true,
      offset: -80,
      spy: true,
    });
  };

  return (
    <Container className={menu ? "mainHeader activeMenu" : "mainHeader"}>
      <Container className="mainHeader__container">
        <Box className="mainHeader__inner">
          <Box className="mainHeader__logo">
            <Link to="/">
              <img src={apfelhersLogo} alt="logo" />
            </Link>
          </Box>

          <Box className="menuToggleBtn" onClick={handleMenuToggle}>
            {menu ? <Close /> : <img src={menuicon} alt="menuicon" />}
          </Box>

          <Box className="mainHeader__menu">
            {navbarContent.map((item: any, i: any) => {
              if (navbarContent?.length - 1 === i) {
                return (
                  <NavLink
                    to={item?.attributes?.NavLink}
                    key={i}
                    className="mainHeader__menu-navbtn"
                  >
                    {item?.attributes?.Navlabel}
                  </NavLink>
                );
              } else {
                if (navbarContent?.length - 2 === i) {
                  return (
                    <NavLink
                      to={item?.attributes?.NavLink}
                      key={i}
                      className="mainHeader__menu-item"
                    >
                      {item?.attributes?.Navlabel}
                    </NavLink>
                  );
                }
                return (
                    <li
                    style={{ listStyleType: "none", margin: 0, padding: 0 }}
                      key={i}
                      onClick={() => goToPageAndScroll(item.attributes.NavLink)}
                      className="mainHeader__menu-item"
                    >
                      {item.attributes.Navlabel}
                    </li>
               

                );
              }
            })}

            {/* <Language/> */}
          </Box>
        </Box>
      </Container>
    </Container>
  );
}

export default Header;
