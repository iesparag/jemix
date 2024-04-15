import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Box, Button, Container, Typography } from "@mui/material";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
// import { FaLongArrowAltRight } from "react-icons/fa";
// import heroimg from "../../assets/heroimg.png";
import { RootState } from "../../redux/store";
import "../../styles/herosection.scss";

const HeroSection = () => {
  const [heroSection, setHeroSection] = useState<any>([]);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );

  const [mainHead, setMainHead] = useState("");

  const getHeroSectionData = async () => {
    try {
      const response = await axios.get(
        `https://cms.apfelherz.com/api/herosections?${
          currentLanguage === "English" ? "locale=en" : "locale=de"
        }&&populate=*`
      );
      setHeroSection(response.data.data);
      setMainHead(response.data.data[0]?.attributes?.maintext);
    } catch (error) {
      console.log("--error", error);
    }
  };

  useEffect(() => {
    getHeroSectionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  return (
    <>
      <Container className="heroContent">
        <Container className="heroContent__text">
          <Typography className="heroContent__textHeading">
            <span style={{ color: "green" }}>
              {heroSection[0]?.attributes?.hashtext.split(" ")[0]}
            </span>
            {heroSection[0]?.attributes?.hashtext.substring(2)}
          </Typography>

          <Typography variant="h1">
            {mainHead
              .split(" ")
              .slice(0, 2)
              .map((word, index) => (
                <span
                  key={index}
                  style={{
                    background:
                      index === 0
                        ? "linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%)"
                        : "transparent",
                    WebkitBackgroundClip: "text",
                    color: index === 0 ? "transparent" : "",
                  }}
                >
                  {word}{" "}
                </span>
              ))}
          </Typography>
          <Typography variant="h1">
            {" "}
            {mainHead.split(" ").slice(2).join(" ")}
          </Typography>

          <Typography variant="h6" className="heroContent__details">
            {heroSection[0]?.attributes.herodescription}
          </Typography>

          <a href={`#benefits`}>
            <Button className="button" variant="contained">
              {heroSection[0]?.attributes?.herobuttontext}{" "}
              <TrendingFlatIcon className="button-icon" />
            </Button>
          </a>
        </Container>

        <Box>
          <img
            src={`https://cms.apfelherz.com/${heroSection[0]?.attributes?.heroImage?.data?.attributes?.url}`}
            alt="hero"
          />

          <Box className="heroGradient">
            <Box
              style={{
                width: 642,
                height: 0,
                position: "relative",
                transform: "rotate(146.40deg)",
                transformOrigin: "0 0",
              }}
            >
              <Box
                style={{
                  width: 234.79,
                  height: 238.24,
                  left: -456.59,
                  top: 48.63,
                  position: "absolute",
                  transform: "rotate(146.40deg)",
                  transformOrigin: "0 0",
                  background: "rgba(173.40, 255, 0, 0.50)",
                  boxShadow: "10px 10px 10px ",
                  borderRadius: 9999,
                  filter: "blur(120px)",
                }}
              />
              <Box
                style={{
                  width: '369.58px',
                  height: "376.48px",
                  left: "-18%",
                  top: "97px",
                  position: "absolute",
                  transform: "rotate(146.4deg)",
                  transformOrigin: "0px 0px",
                  background: "rgba(28, 163, 127, 0.3)",
                  boxShadow: "8px 8px 8px",
                  borderRadius: "9999px",
                  filter: "blur(150px)",
                }}
              />
              <Box
                style={{
                  width: 146.74,
                  height: 148.9,
                  left: -452.06,
                  top: 135,
                  position: "absolute",
                  transform: "rotate(146.40deg)",
                  transformOrigin: "0 0",
                  background: "rgba(0, 75.18, 129.62, 0.30)",
                  boxShadow: "10px 10px 10px ",
                  borderRadius: 9999,
                  filter: "blur(120px)",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default HeroSection;
