import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import "../../styles/companysolutions.scss";

const CompanySolutions = () => {
  // /api/procurements
  const [companyData, setCompanyData] = useState<any>({});
  const [companySoluData, setCompanySoluData] = useState<any>([]);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );
  const [mainHead, setMainHead] = useState<string>("");

  useEffect(() => {
    getCompanySolutionHead();
    getCompanySolutionData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  const getCompanySolutionData = async () => {
    try {
      const response = await axios.get(
        `https://cms.apfelherz.com/api/procurements?${
          currentLanguage === "English" ? "locale=en" : "locale=de"
        }&&populate=*`
      );
      setCompanySoluData(response.data.data);
    } catch (error) {
      console.log("---error", error);
    }
  };

  const getCompanySolutionHead = async () => {
    try {
      const response = await axios.get(
        `https://cms.apfelherz.com/api/mid-sections?${
          currentLanguage === "English" ? "locale=en" : "locale=de"
        }&&populate=*`
      );

      if (currentLanguage === "English") {
        const updatedText =
          response.data.data[0]?.attributes?.companyNeedMainheading.replace(
            new RegExp("needs ", "g"),
            `<span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">needs </span>`
          );
        // setMainHead(updatedText);

        // Change the color of the second word
        const finalUpdatedText = updatedText.replace(
          new RegExp("time.", "g"),
          `<span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">time.</span><br/>`
        );

        const finalUpdatedTextData = finalUpdatedText.replace(
          new RegExp("Procurement", "g"),
          `<span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">Procurement</span>`
        );
        setMainHead(finalUpdatedTextData);
      } else {
        const updatedText =
          response.data.data[0]?.attributes?.companyNeedMainheading.replace(
            new RegExp("Bedarf", "g"),
            `<span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">Bedarf</span>`
          );
        // setMainHead(updatedText);

        // Change the color of the second word
        const finalUpdatedText = updatedText.replace(
          new RegExp("Zeit.", "g"),
          `<span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">Zeit.</span><br/>`
        );

        const finalUpdatedTextData = finalUpdatedText.replace(
          new RegExp("Beschaffung", "g"),
          `<span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">Beschaffung</span>`
        );
        setMainHead(finalUpdatedTextData);
      }

      setCompanyData(response?.data?.data[0].attributes);
    } catch (error) {
      console.log("--->", error);
    }
  };

  return (
    <Container id={currentLanguage === "English" ? "project" : "projektphasen"}>
      <Container className="foundDetails">
        <Box className="aboutTitle">
          <Box className="aboutTitle__head">
            <Typography>{companyData?.companyNeedHashText}</Typography>
            <Typography
              variant="h1"
              dangerouslySetInnerHTML={{ __html: mainHead }}
            />
          </Box>
        </Box>
        <Box className="found">
          <Box className="aboutMainContainer">

            <Box className='rightSideSolution'>
              {companySoluData.map((item: any, i: number) => {
                if ((i + 1) % 2 !== 0) {
                  return (
                    <Box key={i}>
                      <Box className="timeline">
                        {/* {i !== 0 && (
                        <Box className="centerStyle" sx={{ order: "2" }}>
                          <Box className="line"></Box>
                          <Box className="circle"></Box>
                        </Box>
                      )} */}
                        <Box className="aboutMainContainer">
                          <Box className="aboutContainer">
                            <img
                              src={`https://cms.apfelherz.com/${item?.attributes?.Image?.data[0]?.attributes?.url}`}
                              alt="wir1"
                            />
                            <Box className="wirContainer">
                              <Typography variant="h2">
                                {item?.attributes?.MainText}
                              </Typography>
                              <Typography>
                                {item?.attributes?.SubText}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  );
                }
              })}
            </Box>
            <Box className='centerSideSolution'>
              <Box className="centerStyle" sx={{ order: "2" }}>
                <Box className="circle"></Box>
                <Box className="line"></Box>
                <Box className="circle"></Box>
                <Box className="line"></Box>
                <Box className="circle"></Box>
                <Box className="line"></Box>
                <Box className="circle"></Box>
              </Box>
            </Box>
            <Box className='leftSideSolution'>
              {companySoluData.map((item: any, i: number) => {
                if ((i + 1) % 2 === 0) {
                  return (
                    <Box key={i}>
                      <Box className="timeline2">
                        {/* <Box className="centerStyle">
                        <Box className="circle"></Box>
                        <Box className="line"></Box>
                        <Box className="circle"></Box>
                      </Box> */}
                        <Box className="aboutMainContainer2">
                          <Box className="aboutContainer">
                            <img
                              src={`https://cms.apfelherz.com/${item?.attributes?.Image?.data[0]?.attributes?.url}`}
                              alt="wir1"
                            />
                            <Box className="wirContainer">
                              <Typography variant="h2">
                                {item?.attributes?.MainText}
                              </Typography>
                              <Typography>
                                {item?.attributes?.SubText}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  );
                }
              })}
            </Box>
          </Box>
        </Box>
      </Container>
      {/* <Box className="bgImg"> */}
      <Box
        style={{
          width: 642,
          position: "relative",
          transform: "rotate(-27.30deg)",
          transformOrigin: "0 0",
          left: "1280px",
          top: "300px",
          zIndex: "-10",
        }}
      >
        <Box
          style={{
            width: 234.79,
            height: 238.24,
            left: 459.17,
            top: 1.82,
            position: "absolute",
            transform: "rotate(-27.30deg)",
            transformOrigin: "0 0",
            background: "rgba(173.40, 255, 0, 0.30)",
            borderRadius: 9999,
            filter: "blur(120px)",
          }}
        />
        <Box
          style={{
            width: 469.58,
            height: 476.48,
            left: 0,
            top: 0,
            position: "absolute",
            transform: "rotate(-27.30deg)",
            transformOrigin: "0 0",
            background: "rgba(28, 163, 127, 0.30)",
            borderRadius: 9999,
            filter: "blur(374.63px)",
          }}
        />
        <Box
          style={{
            width: 146.74,
            height: 148.9,
            left: 464.15,
            top: -84.53,
            position: "absolute",
            transform: "rotate(-27.30deg)",
            transformOrigin: "0 0",
            background: "rgba(0, 75.18, 129.62, 0.30)",
            boxShadow: "10px 10px 10px ",
            borderRadius: 9999,
            filter: "blur(120px)",
          }}
        />
      </Box>
    </Container>
  );
};

export default CompanySolutions;
