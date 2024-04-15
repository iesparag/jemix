import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import addressIcon from "../../assets/PNG/buildingIcon.png";
import emailIcon from "../../assets/PNG/mailIcon.png";
import phoneIcon from "../../assets/PNG/phoneIcon.png";
import "../../styles/contactform.scss";

const ContactForm = () => {
  const [contactFormContent, setContactFormContent] = useState<any>();
  const currentLanguage = useSelector(
    (state: RootState) => state?.language?.language
  );
  const [contactHeader, setContactHeader] = useState<any>();
  const [mainHead, setMainHead] = useState<string>("");

  useEffect(() => {
    getContact();
    fetchContactFormContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  const fetchContactFormContent = async () => {
    try {
      const response = await axios.get(
        `https://cms.apfelherz.com/api/contact-forms?${
          currentLanguage === "English" ? "locale=en" : "locale=de"
        }&&populate=*`
      );
      setContactFormContent(response?.data?.data[0]?.attributes);
    } catch (error) {
      console.log("error", error);
    }
  };
  const getContact = async () => {
    try {
      const response = await axios.get(
        `https://cms.apfelherz.com/api/conact-sections?${
          currentLanguage === "English" ? "locale=en" : "locale=de"
        }&&populate=*`
      );

      if (currentLanguage === "English") {
        const updatedText = response.data.data[0]?.attributes?.maintext.replace(
          new RegExp("new Apple supplier", "g"),
          `<br/><span style="color: #ac4665 ;">
          new Apple supplier</span><br/>`
        );
        setMainHead(updatedText);
      } else {
        const updatedText = response.data.data[0]?.attributes?.maintext.replace(
          new RegExp("neuen Apple-Lieferanten", "g"),
          `<br/><span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">
          neuen Apple-Lieferanten</span><br/>`
        );
        setMainHead(updatedText);
      }

      setContactHeader(response?.data?.data[0]);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Container className="contactForm">

      <Grid
        container
        spacing={4}
        className="contactForm__detail"
      >
        <Grid item xs={12} md={6} className="detailsForm">
          <Box className="textHead">
            <Typography>{contactHeader?.attributes?.hashtext}</Typography>
            <Typography
              variant="h1"
              dangerouslySetInnerHTML={{ __html: mainHead }}
            />
          </Box>
          <Box className="parentSmallContainer">
            <Box className="containerDesk">
              <Box className="phoneBox">
                <Box className="boxContact">
                  <img src={phoneIcon} className="contactIcon" alt="contactIcon"/>
                  <Typography>
                    <a href="tel:+493088710233">
                      +{contactFormContent?.officePhone}
                    </a>
                  </Typography>
                </Box>
              </Box>
              <Box className="addressBox">
                <Box className="boxContact">
                  <img src={addressIcon} className="contactIcon" alt="contactIcon"/>
                  <Typography>
                    <a
                      href="https://www.google.com/search?q=jemix+Hauptstra%C3%9Fe+117+berlin&sca_esv=c8032146a3e65808&sxsrf=ACQVn0_Gxj9GdpPWcZY_ftYgIVnzkNivBQ%3A1707130062493&ei=zrzAZcDUHcWDxc8P-Ie74Aw&ved=0ahUKEwjA89aHg5SEAxXFQfEDHfjDDswQ4dUDCBA&uact=5&oq=jemix+Hauptstra%C3%9Fe+117+berlin&gs_lp=Egxnd3Mtd2l6LXNlcnAiHWplbWl4IEhhdXB0c3RyYcOfZSAxMTcgYmVybGluMgIQJkjIG1DoCVj9GXAEeAGQAQCYAWOgAeYFqgEBObgBA8gBAPgBAcICChAAGEcY1gQYsAPCAgcQIxiwAhgnwgIHEAAYgAQYDcICCBAAGAUYHhgNwgIIEAAYCBgeGA3CAgoQIRgKGKABGMMEwgIIEAAYgAQYogTCAggQABiJBRiiBOIDBBgAIEGIBgGQBgg&sclient=gws-wiz-serp"
                      target="_blank" rel="noreferrer"
                    >
                      Hauptstr.117
                      <br />
                      10827 Berlin
                    </a>
                  </Typography>
                </Box>
              </Box>
              <Box className="emailBox">
                <Box className="boxContact">
                  <img src={emailIcon} className="contactIcon" alt="contactIcon"/>
                  <Typography>
                    <a href="mailto:kontakt@apfelherz.com">
                      {contactFormContent?.officeEmail}
                    </a>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box className="form">
            <Grid container spacing={4} className="formGrid">
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  name="name"
                  type="text"
                  label={contactFormContent?.Name}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  name="email"
                  type="email"
                  label={contactFormContent?.Email}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  name="message"
                  type="text"
                  label={contactFormContent?.Message}
                  fullWidth
                />
              </Grid>
            </Grid>
            {/* <Box className="btn"> */}
            <Button variant="contained" className="button">
              {contactHeader?.attributes?.ButtonText} <ArrowRightAltIcon />
            </Button>
            {/* </Box> */}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            className="parentContainer"
            sx={{
              backgroundImage: `url('https://cms.apfelherz.com/${contactHeader?.attributes?.image?.data?.attributes?.url}')`,
            }}
          >
            <Box className="containerDesk">
              <Box className="addressBox">
                <Box className="boxContact">
                  <img src={addressIcon} className="contactIcon" alt="contactIcon"/>
                  <Typography>
                    <a
                      href="https://www.google.com/search?q=jemix+Hauptstra%C3%9Fe+117+berlin&sca_esv=c8032146a3e65808&sxsrf=ACQVn0_Gxj9GdpPWcZY_ftYgIVnzkNivBQ%3A1707130062493&ei=zrzAZcDUHcWDxc8P-Ie74Aw&ved=0ahUKEwjA89aHg5SEAxXFQfEDHfjDDswQ4dUDCBA&uact=5&oq=jemix+Hauptstra%C3%9Fe+117+berlin&gs_lp=Egxnd3Mtd2l6LXNlcnAiHWplbWl4IEhhdXB0c3RyYcOfZSAxMTcgYmVybGluMgIQJkjIG1DoCVj9GXAEeAGQAQCYAWOgAeYFqgEBObgBA8gBAPgBAcICChAAGEcY1gQYsAPCAgcQIxiwAhgnwgIHEAAYgAQYDcICCBAAGAUYHhgNwgIIEAAYCBgeGA3CAgoQIRgKGKABGMMEwgIIEAAYgAQYogTCAggQABiJBRiiBOIDBBgAIEGIBgGQBgg&sclient=gws-wiz-serp"
                      target="_blank" rel="noreferrer"
                    >
                      Hauptstr.117
                      <br />
                      10827 Berlin
                    </a>
                  </Typography>
                </Box>
              </Box>
              <Box className="emailBox">
                <Box className="boxContact">
                  <img src={emailIcon} className="contactIcon" alt="contactIcon"/>
                  <Typography>
                    <a href="mailto:kontakt@apfelherz.com">
                      {contactFormContent?.officeEmail}
                    </a>
                  </Typography>
                </Box>
              </Box>
              <Box className="phoneBox">
                <Box className="boxContact">
                  <img src={phoneIcon} className="contactIcon" alt="contactIcon"/>
                  <Typography>
                    <a href="tel:+493088710233">
                      +{contactFormContent?.officePhone}
                    </a>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactForm;
