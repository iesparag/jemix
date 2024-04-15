import React, { useEffect, useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import "../../styles/company.scss";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Company = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );
  const [aboutData, setAboutData] = useState<any>({});
  const [hasText, setHastText] = useState<string>("");
  const [aboutTitle, setAboutTitle] = useState<string>("");

  const navigate = useNavigate();

  const getAbout = async () => {
    try {
      const response = await axios.get(
        `https://cms.apfelherz.com/api/about-sections?${
          currentLanguage === "English" ? "locale=en" : "locale=de"
        }&&populate=*`
      );
      if (currentLanguage === "English") {
        const updatedText = response.data.data[0]?.attributes?.hasText.replace(
          new RegExp("# Satisfied employees", "g"),
          `<span style="color: green;">
          # Satisfied employees</span>`
        );
        setHastText(updatedText);
        const updated = response.data.data[0]?.attributes?.AboutTitle.replace(
          new RegExp("employees fans", "g"),
          `<span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">
          employees fans</span>`
        );
        setAboutTitle(updated);
      } else {
        const updatedText = response.data.data[0]?.attributes?.hasText.replace(
          new RegExp("# Zufriedene Mitarbeiter", "g"),
          `<span style="color: green;">
          # Zufriedene Mitarbeiter</span>`
        );
        setHastText(updatedText);
        const updated = response.data.data[0]?.attributes?.AboutTitle.replace(
          new RegExp("Mitarbeitern Fans", "g"),
          `<span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">
          Mitarbeitern Fans</span>`
        );
        setAboutTitle(updated);
      }

      setAboutData(response?.data?.data[0]);
    } catch (error) {
      console.log("--error", error);
    }
  };

  useEffect(() => {
    getAbout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  return (
    <Box className="company">
      <Box>
        <img
          src={`https://cms.apfelherz.com/${aboutData.attributes?.AboutImage?.data?.attributes?.url}`}
          alt="ourCompany"
        />
      </Box>

      <Box className="companyDetail">
        <Typography dangerouslySetInnerHTML={{ __html: hasText }}></Typography>
        <Typography
          variant="h1"
          dangerouslySetInnerHTML={{ __html: aboutTitle }}
        ></Typography>
        <Typography>{aboutData?.attributes?.AboutDesc}</Typography>
        <Link to="https://jemix.de/de/">
          <Button
            variant="contained"
            className="button"
            // onClick={() => {
            //   navigate("/contact");
            // }}
          >
            {aboutData?.attributes?.AboutButton} <ArrowRightAltIcon />
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Company;
