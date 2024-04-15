import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import QuestionMarkIcon from "../../assets/SVG/questionMark.svg";
import workplaceicon1 from "../../assets/SVG/workplaceicon1.svg";
import workplaceicon2 from "../../assets/SVG/workplaceicon2.svg";
import "../../styles/workplace.scss";
import { Link } from "react-router-dom";

const Workplace = () => {
  
  const icons: any = [
    {
      icon: workplaceicon1,
    },
    {
      icon: workplaceicon2,
    },
    {
      icon: QuestionMarkIcon,
    },
  ];

  const [workPlaceData, setWorkPlaceData] = useState<any>({});
  const [WorkPlacePoint, setWorkPlacePoint] = useState([]);
  const [subService, setSubService] = useState<any>({});
  const [subServiceHead, setSubServiceHead] = useState<string>("");
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );



  useEffect(() => {
    getService();
    getServicePoint();
    getServiceSubSec();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  const getService = async () => {
    try {
      const response = await axios.get(
        `https://cms.apfelherz.com/api/service-sections?${
          currentLanguage === "English" ? "locale=en" : "locale=de"
        }&&populate=*`
      );

      setWorkPlaceData(response.data.data[0]);
    } catch (error) {
      console.log("---error", error);
    }
  };

  const getServicePoint = async () => {
    try {
      const response = await axios.get(
        `https://cms.apfelherz.com/api/service-section-main-points?${
          currentLanguage === "English" ? "locale=en" : "locale=de"
        }&&populate=*`
      );

      setWorkPlacePoint(response.data.data);
    } catch (error) {
      console.log("---error", error);
    }
  };

  const getServiceSubSec = async () => {
    try {
      const response = await axios.get(
        `https://cms.apfelherz.com/api/service-sub-sections?${
          currentLanguage === "English" ? "locale=en" : "locale=de"
        }&&populate=*`
      );
      setSubService(response.data.data[0]);

      if (currentLanguage === "English") {
        const updatedText =
          response.data.data[0]?.attributes?.mainHeading.replace(
            new RegExp("Apple workstations", "g"),
            `<span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">
          Apple workstations</span><br/>`
          );
        setSubServiceHead(updatedText);
      } else {
        const updatedText =
          response.data.data[0]?.attributes?.mainHeading.replace(
            new RegExp("Apple-Arbeitsplätze", "g"),
            `<span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">
            Apple-Arbeitsplätze</span>`
          );
        setSubServiceHead(updatedText);
      }
    } catch (error) {
      console.log("---error", error);
    }
  };
  // /api/service-sections

  // main point data api
  // /api/service-section-main-points

  return (
    <Box>
      <Container
        className="workplace"
        id={currentLanguage === "English" ? "service" : "leistungen"}
      >
        <Box className="headWorkplace">
          <Typography>{workPlaceData?.attributes?.hasText}</Typography>
          <Typography variant="h1">
            {workPlaceData?.attributes?.mainHeading}
          </Typography>
          <Link to='/contact'>
          <Button variant="contained" className="button">
            {workPlaceData?.attributes?.Buttontext} <ArrowRightAltIcon />
          </Button>
          </Link>
        </Box>

        <Box className="sideDetails">
          <img
            src={`https://cms.apfelherz.com/${workPlaceData?.attributes?.MainImage?.data[0]?.attributes?.url}`}
            alt="workPlace"
          />
          <Box className="sideText">
            <Typography variant="h2">
              {workPlaceData?.attributes?.subHeading}
            </Typography>
            <Box className="sideText__details">
            {WorkPlacePoint.map((item: any, i: number) => {
              return (
                <Box className="side" key={i}>
                  <Box className="icon">
                    <img
                      src={icons[i].icon}
                      alt="icon"
                      className="img-fluid"
                    />
                  </Box>
                  <Typography>{item?.attributes?.servicePoint}</Typography>
                </Box>
              );
            })}
            </Box>
          </Box>
        </Box>

        <Box className="maincontainer">
          <Typography
            variant="h1"
            dangerouslySetInnerHTML={{ __html: subServiceHead }}
          />

          <Box className="container">
            <Box className="box">
              <Box className="icon">
                <SettingsIcon />
              </Box>
              <Typography>
                {subService?.attributes?.settingText}
                {/* Software, Maintenance und Support inklusive */}
              </Typography>
            </Box>

            <Box className="box">
              <Box className="icon">
                <AccountCircleIcon />
              </Box>
              <Typography>
                {subService?.attributes?.AccountText}
                {/* Nicht von der Stange, sondern ganz inBoxidualisiert */}
              </Typography>
            </Box>

            <Box className="box">
              <Box className="icon">
                <AttachMoneyIcon />
              </Box>
              <Typography>
                {subService?.attributes?.moneyText}
                {/* Software, Maintenance und Support inklusive */}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Workplace;
