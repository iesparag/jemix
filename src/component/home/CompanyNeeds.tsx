import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import WissenImg from "../../assets/PNG/WissenImg.png";
import icon1 from "../../assets/SVG/icon1.svg";
import icon2 from "../../assets/SVG/icon2.svg";
import icon3 from "../../assets/SVG/icon3.svg";
import icon4 from "../../assets/SVG/icon4.svg";
import needsgradient from "../../assets/PNG/needsgradient.png";
import "../../styles/companyneeds.scss";

function CompanyNeeds() {
  const icons: any = [
    {
      icon: icon1,
    },
    {
      icon: icon2,
    },
    {
      icon: icon3,
    },
    {
      icon: icon4,
    },
  ];

  const [companyData, setCompanyData] = useState<any>({});
  const [companySubData, setCompanySubData] = useState([]);
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );
  const [mainHead, setMainHead] = useState<string>("");

  useEffect(() => {
    getMainHeader();
    getSubTitle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  const getSubTitle = async () => {
    try {
      const response = await axios.get(
        `https://cms.apfelherz.com/api/mid-section-points?${
          currentLanguage === "English" ? "locale=en" : "locale=de"
        }&&populate=*`
      );
      setCompanySubData(response?.data?.data);
    } catch (error) {
      console.log("---", error);
    }
  };

  const getMainHeader = async () => {
    try {
      const response = await axios.get(
        `https://cms.apfelherz.com/api/mid-sections?${
          currentLanguage === "English" ? "locale=en" : "locale=de"
        }&&populate=*`
      );

      setCompanyData(response?.data?.data[0].attributes);

      if (currentLanguage === "English") {
        const updatedText =
          response?.data?.data[0]?.attributes?.mainHeading.replace(
            new RegExp("know", "g"),
            `<span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">know</span>`
          );
        setMainHead(updatedText);
      } else {
        const updatedText =
          response?.data?.data[0]?.attributes?.mainHeading.replace(
            new RegExp("wissen", "g"),
            `<span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">wissen</span>`
          );
        setMainHead(updatedText);
      }
    } catch (error) {
      console.log("---", error);
    }
  };

  return (
    <Container id={"benefits"}>
      <Box className="companyNeed" sx={{backgroundImage: `url(${needsgradient})`, }}>
   
        <Container className="companyNeed__detail">
          <Box className="textHead">
            <Typography
              variant="h1"
              dangerouslySetInnerHTML={{ __html: mainHead }}
            ></Typography>
            <Typography component="p">{companyData?.subHeading}</Typography>
          </Box>
          <Container className="subContent">
            <Box className="img">
              <img src={WissenImg} alt="wiss" />
            </Box>

            <Box className="sideDetails">
              {companySubData.map((item: any, i: number) => {
                return (
                  <Box key={i}>
                    <Box className="sideContent">
                      <Box className="icon">
                        <img src={icons[i].icon} alt="icon" />
                      </Box>
                      <Box className="sideText">
                        <Typography variant="h1">
                          {item?.attributes?.PointsHeading}
                        </Typography>
                        <Typography>
                          {item?.attributes?.PointsDescription}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Container>
        </Container>
      </Box>
    </Container>
  );
}

export default CompanyNeeds;
