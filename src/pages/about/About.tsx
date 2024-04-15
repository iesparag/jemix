import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import axios from "axios";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import Customers from "../../component/home/Customers";
import DetailBoxShadow from "../../assets/PNG/detailBoxShadow.png";
import "../../styles/about.scss";

const About = () => {
  const [aboutMain, setAboutMain] = useState<any>({});
  const [subService, setSubService] = useState<any>([]);
  const [founderData, setFounderData] = useState<any>({});
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );

  const [mainHead, setMainHead] = useState<string>("");
  const [subMainHead, setSubMainHead] = useState<string>("");

  useEffect(() => {
    getService();
    getServiceSubSec();
    getFonder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  const getService = async () => {
    try {
      const response = await axios.get(
        `https://cms.apfelherz.com/api/about-section-pages?${
          currentLanguage === "English" ? "locale=en" : "locale=de"
        }&&populate=*`
      );

      setAboutMain(response.data.data[0]);

      if (currentLanguage === "English") {
        const updatedText =
          response.data.data[0]?.attributes?.mainHeading.replace(
            new RegExp("Apple Heart", "g"),
            `<span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">
          Apple Heart</span>`
          );
        setMainHead(updatedText);
        const updatedTextData =
          response.data.data[0]?.attributes?.SubSectionHeading.replace(
            new RegExp("Apple Heart ", "g"),
            `<br/><span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">
            Apple Heart </span>`
          );
        setSubMainHead(updatedTextData);
      } else {
        const updatedText =
          response.data.data[0]?.attributes?.mainHeading.replace(
            new RegExp("Apfelherz", "g"),
            `<span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">
            Apfelherz</span>`
          );
        setMainHead(updatedText);
        const updatedTextData =
          response.data.data[0]?.attributes?.SubSectionHeading.replace(
            new RegExp("Apfelherz", "g"),
            `<br/><span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">
            Apfelherz</span>`
          );
        setSubMainHead(updatedTextData);
      }
    } catch (error) {
      console.log("---error", error);
    }
  };

  const getServiceSubSec = async () => {
    try {
      const response = await axios.get(
        `https://cms.apfelherz.com/api/about-pag-appleshearts?${
          currentLanguage === "English" ? "locale=en" : "locale=de"
        }&&populate=*`
      );

      setSubService(response.data.data);
    } catch (error) {
      console.log("---error", error);
    }
  };

  const getFonder = async () => {
    try {
      const response = await axios.get(
        `https://cms.apfelherz.com/api/about-page-fouders?${
          currentLanguage === "English" ? "locale=en" : "locale=de"
        }&&populate=*`
      );

      setFounderData(response.data.data[0]);
    } catch (error) {
      console.log("---error", error);
    }
  };

  return (
    <Box className="about">
      <Box className="mainContent">
        <Box>
          <Grid container spacing={4} className="headContent">
            <Grid item xs={10} sm={6}>
              <Box className="headContent__Details">
                <Box className="text">
                  <Typography>
                    {aboutMain?.attributes?.mainHashText}
                    {/* IHR kompetenteR Partner für Apple Hardware! */}
                  </Typography>

                  <Typography
                    variant="h1"
                    dangerouslySetInnerHTML={{
                      __html: mainHead,
                    }}
                  ></Typography>
                  <Typography variant="h6">
                    {aboutMain?.attributes?.mainHeadingDesc}
                  </Typography>
                </Box>
                <Box className="details">
                  <Box className="aboutBtn1">
                    <a href={`#aboutDetails`}>
                      <Button className="button" variant="contained">
                        {aboutMain?.attributes?.buttonText}{" "}
                        <TrendingFlatIcon className="downArrow" />
                      </Button>
                    </a>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <img
                src={`https://cms.apfelherz.com/${aboutMain?.attributes?.MainImage?.data[0]?.attributes?.url}`}
                alt="about"
              />
            </Grid>
          </Grid>
        </Box>

        <Box className="foundDetails" id={"aboutDetails"}>
          <Box className="aboutTitle">
            <Box style={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h2"
                dangerouslySetInnerHTML={{
                  __html: subMainHead,
                }}
              />
            </Box>
          </Box>
          <Box className="aboutFound">
            <Box className="sideGradient3" />

            <Box className="aboutFound__detailBox">
              <img className="DetailBoxShadow" src={DetailBoxShadow} alt="" />
              <Box className="aboutRideSide">
                {subService.map((item: any, i: number) => {
                  if ((i + 1) % 2 !== 0) {
                    return (
                      <React.Fragment key={i}>
                        <Box className="timeline">
                          <Box className="aboutMainContainer">
                            <Box className="aboutContainer">
                              <Typography variant="h3">
                                {item?.attributes?.label}
                              </Typography>
                              <Typography>
                                {item?.attributes?.descriptions}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </React.Fragment>
                    );
                  } else {
                    return null;
                  }
                })}
              </Box>
              <Box>
                <Box className="centerStyle">
                  <Box className="circle"></Box>
                  <Box className="line"></Box>
                  <Box className="circle"></Box>
                  <Box className="line"></Box>
                  <Box className="circle"></Box>
                </Box>
              </Box>
              <Box>
                {subService.map((item: any, i: number) => {
                  // eslint-disable-next-line react-hooks/exhaustive-deps
                  if ((i + 1) % 2 === 0) {
                    return (
                      <>
                        <Box className="timeline2" key={i}>
                          <Box className="aboutMainContainer2">
                            <Box className="aboutContainer">
                              <Typography variant="h3">
                                {item?.attributes?.label}
                              </Typography>
                              <Typography>
                                {item?.attributes?.descriptions}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </>
                    );
                  } else {
                    return null;
                  }
                })}
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className="sideGradient" />
        <Box className="founder">
          <Grid container spacing={4} className="founder__box">
            <Grid item xs={10} sm={6}>
              <Box className="founder__Details">
                <Box className="text">
                  <Typography>{founderData?.attributes?.hasText}</Typography>

                  <Typography variant="h1">
                    {founderData?.attributes?.mainHeading}
                  </Typography>

                  <Typography variant="h6">
                    {founderData?.attributes?.mainHeadingdesc}
                  </Typography>
                </Box>
                <Box className="details">
                  <Box className="aboutBtn">
                    <Button variant="contained" className="button">
                      {founderData?.attributes?.buttonText}{" "}
                      <TrendingFlatIcon className="downarrow" />
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={6} className="founderImg">
              <img
                src={`https://cms.apfelherz.com/${founderData?.attributes?.fouderImage?.data[0]?.attributes?.url}`}
                alt="founders"
              />
            </Grid>
          </Grid>
        </Box>

        {/* <Customers /> */}
      </Box>
    </Box>
  );
};

export default About;
