import React, { useEffect, useState } from "react";
import footerLogo from "../../assets/PNG/footerLogo.png";
import "../../styles/footer.scss";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { NavLink, useNavigate } from "react-router-dom";
// @ts-ignore
import * as Scroll from "react-scroll";
import Language from "../Language/language";
const Footer = () => {
  const [navbarContent, setNavbarContent] = useState([]);
  const scroller = Scroll.scroller;
  const navigate = useNavigate();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );
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

  useEffect(() => {
    fetchNavbarContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);
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
    <Container>
      <Container className="footersection">
        <Box className="container">
          <Box className="logoside">
            <img src={footerLogo} alt="footerLogo" />
            <Typography>Hauptstraße 117 10827 Berlin</Typography>
          </Box>

          <Box className="menu-items">
            {navbarContent.map((item: any, i: any) => {
              if (navbarContent?.length - 1 === i) {
                return <Box key={i}></Box>;
              } else {
                if (navbarContent?.length - 2 === i) {
                  return (
                    <NavLink
                      to={item?.attributes?.NavLink}
                      key={i}
                      className="nav-link"
                    >
                      {item?.attributes?.Navlabel}
                    </NavLink>
                  );
                }
                return (
                  <li
                    key={i}
                    onClick={() => goToPageAndScroll(item.attributes.NavLink)}
                    className="nav-link"
                  >
                    {item.attributes.Navlabel}
                  </li>
                );
              }
            })}

            <Box className="sideSmall">
              <NavLink to="/imprint" className="nav-link">
                Impressum
              </NavLink>
              <NavLink to="/dataProtection" className="nav-link">
                Datenschutzerklärung
              </NavLink>
            </Box>
            <Language />
          </Box>
        </Box>

        <hr />

        <Box className="copyrightarea">
          <Typography>
            Copyrights © 2023 All Rights Reserved by Apfelherz Handel GmbH.
          </Typography>
          <Box className="side">
            <NavLink to="/imprint" className="nav-link">
              Impressum
            </NavLink>
            <NavLink to="/dataProtection" className="nav-link">
              Datenschutzerklärung
            </NavLink>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default Footer;
