import React, { useEffect, useState } from "react";
import axios from "axios";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
// import contactpagebg from "../../assets/contactpagebg.png";
import "../../styles/contact.scss";

const Contact = () => {
  const [contactFormContent, setContactFormContent] = useState<any>();
  const currentLanguage = useSelector(
    (state: RootState) => state?.language?.language
  );
  const [contactHeader, setContactHeader] = useState<any>();
  const [mainHead, setMainHead] = useState<any>("");
  const [contactDec, setContactDec] = useState<any>("");

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

      if (currentLanguage === "English") {
        const updatedText =
          response.data.data[0]?.attributes?.mainHeading.replace(
            new RegExp("Apple products", "g"),
            `<span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">
            Apple products</span>`
          );
        setMainHead(updatedText);
        const updatedSubText =
          response.data.data[0]?.attributes?.subHeadingDesc.replace(
            new RegExp("2-3 working days", "g"),
            `<span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">
            2-3 working days</span>`
          );
        setContactDec(updatedSubText);
      } else {
        const updatedText =
          response.data.data[0]?.attributes?.mainHeading.replace(
            new RegExp("Apple-Produkten", "g"),
            `<br/><span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">
            Apple-Produkten</span><br/>`
          );
        setMainHead(updatedText);
        const updatedSubText =
          response.data.data[0]?.attributes?.subHeadingDesc.replace(
            new RegExp("2-3 Werktagen", "g"),
            `<span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">
           2-3 Werktagen</span>`
          );
        setContactDec(updatedSubText);
      }
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

      setContactHeader(response?.data?.data[0]);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Box className="contact">
      <Box className="mainContent">
        <Box>
          <Grid container spacing={4} className="contactMain">
            <Grid item xs={10} sm={5}>
              <Box className="contactMain__Details">
                <Box className="text">
                  <Typography>
                    {contactFormContent?.hashText}
                    {/* wir sind von Montag bis Freitag für dich da! */}
                  </Typography>

                  <Typography
                    variant="h1"
                    dangerouslySetInnerHTML={{
                      __html: mainHead,
                    }}
                  ></Typography>
                </Box>
                <Box className="details">
                  <Box className="detailsInside">
                    <Box className="subDetails">
                      <svg
                        width="32"
                        height="23"
                        viewBox="0 0 32 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_166_1145)">
                          <path
                            d="M31.9996 20.5071C31.9151 20.7768 31.8305 21.0464 31.721 21.3936C28.5048 18.0399 25.33 14.7293 22.2305 11.4972C25.3183 8.28032 28.5001 4.9658 31.7217 1.60889C31.8305 1.9537 31.9151 2.22331 31.9996 2.49292V20.5063V20.5071Z"
                            fill="#4A4A4A"
                            fill-opacity="0.3"
                          />
                          <path
                            d="M1.64356 0.193651C2.09989 0.129649 2.55622 0.0112445 3.01254 0.0104445C9.15691 -0.00155592 15.3013 0.00244422 21.4464 0.00244422C23.977 0.00244422 26.5083 -0.00635609 29.0388 0.0112445C29.4764 0.0144446 29.9131 0.129649 30.3507 0.192851C30.3553 0.228852 30.3593 0.264853 30.364 0.300855C30.2896 0.381657 30.2176 0.46566 30.1409 0.544063C26.1396 4.6138 22.1383 8.68355 18.1363 12.7525C17.0843 13.8221 15.7999 14.0389 14.5835 13.3333C14.3252 13.1837 14.0912 12.9749 13.8791 12.7589C9.86527 8.68595 5.85773 4.6082 1.84864 0.531263C1.77662 0.45766 1.70931 0.379257 1.63965 0.303255C1.64121 0.267253 1.642 0.230452 1.64356 0.194451V0.193651Z"
                            fill="#4A4A4A"
                            fill-opacity="0.3"
                          />
                          <path
                            d="M30.2546 22.8216C29.9024 22.8712 29.4469 22.9896 28.9905 22.9904C22.9511 23.0024 16.9116 22.9984 10.8721 22.9984C8.23746 22.9984 5.60282 23.0072 2.96896 22.9896C2.53142 22.9864 2.09388 22.8728 1.71191 22.8176C4.91324 19.4807 8.09109 16.1686 11.2948 12.8301C11.7628 13.3109 12.1847 13.7485 12.6105 14.1821C13.614 15.2046 14.8202 15.7166 16.2408 15.6478C17.4814 15.5878 18.5279 15.0702 19.3999 14.1741C19.8178 13.7445 20.235 13.3149 20.6874 12.8493C23.8841 16.1822 27.065 19.4983 30.2539 22.8216H30.2546Z"
                            fill="#4A4A4A"
                            fill-opacity="0.3"
                          />
                          <path
                            d="M0.336375 1.64807C3.51266 4.95859 6.68894 8.2691 9.78695 11.498C6.68659 14.7301 3.51031 18.0406 0.309762 21.3768C0.0616393 20.8871 -0.00019568 20.4335 0.000587041 19.9631C0.00293521 17.0886 0.00215248 14.2141 0.00215248 11.3404C0.00215248 8.56191 -0.00645745 5.78342 0.0107624 3.00492C0.0138933 2.5633 0.13365 2.12169 0.198616 1.68007L0.336375 1.64887V1.64807Z"
                            fill="#4A4A4A"
                            fill-opacity="0.3"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_166_1145">
                            <rect width="32" height="23" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <Typography>
                        <a href="mailto:kontakt@apfelherz.com">
                          {contactFormContent?.officeEmail}
                        </a>
                      </Typography>
                    </Box>
                    <Box className="subDetails">
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 26 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_166_1143)">
                          <path
                            d="M0 6.53178C0.0737445 6.34996 0.148935 6.09932 0.272566 5.87477C1.00278 4.54482 1.92748 3.35249 2.9534 2.24492C3.55853 1.59226 4.22296 0.990306 4.89895 0.410082C5.82292 -0.383834 6.7563 0.106568 7.22985 0.757782C8.44158 2.4224 9.57233 4.14206 10.4363 6.02109C10.5635 6.29853 10.6568 6.59262 10.7486 6.88455C10.9084 7.39161 10.8122 7.8697 10.4544 8.24782C10.0394 8.68534 9.58462 9.08665 9.13058 9.48433C8.52761 10.0124 8.51243 10.0081 8.82404 10.7375C10.176 13.9059 12.4549 16.1145 15.6599 17.3699C15.9346 17.4778 16.1009 17.4604 16.2954 17.2149C16.6814 16.7274 17.1008 16.2645 17.5223 15.8067C18.0566 15.2257 18.7174 15.0461 19.4367 15.3778C20.3593 15.8038 21.2818 16.242 22.1537 16.7607C23.1912 17.3771 24.1788 18.0783 25.1794 18.7549C25.5908 19.033 25.8373 19.4358 25.961 19.9204C26.0325 20.2007 26.0094 20.4637 25.8648 20.7042C25.6884 20.9968 25.5142 21.2982 25.2915 21.5546C23.8636 23.196 22.1783 24.5274 20.3484 25.6929C19.7079 26.1008 19.0709 26.0291 18.4 25.8965C16.0575 25.4322 13.9348 24.4391 11.9488 23.1475C7.83861 20.4731 4.52806 17.0265 2.10895 12.7447C1.20377 11.1424 0.514766 9.44884 0.168456 7.62993C0.10411 7.29309 0.0643457 6.95264 0.000722985 6.53323L0 6.53178Z"
                            fill="#4A4A4A"
                            fill-opacity="0.3"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_166_1143">
                            <rect width="26" height="26" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <Typography>
                        <a href="tel:+493088710233">
                          +{contactFormContent?.officePhone}
                        </a>
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="contactBtn">
                    <a href={`#contactform`}>
                      <Button className="button" variant="contained">
                        {contactFormContent?.contactButton}{" "}
                        <TrendingFlatIcon className="button-icon" />
                      </Button>
                    </a>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={7}>
              <img
                src={`https://cms.apfelherz.com/${contactFormContent?.Image?.data[0]?.attributes?.url}`}
                alt="concatImage"
              />
              <Box className="contactFormGradientCircle">
                <Box
                  style={{
                    width: 468.05,
                    // height: 289.32,
                    zIndex: "1",
                    position: "relative",
                    transform: "rotate(30.98deg)",
                    transformOrigin: "0 0",
                  }}
                >
                  <Box
                    style={{
                      width: 171.17,
                      height: 144.66,
                      left: 188.2,
                      top: 263.28,
                      zIndex: "1",
                      position: "absolute",
                      transform: "rotate(30.98deg)",
                      transformOrigin: "0 0",
                      background: "rgba(173.40, 255, 0, 0.50)",
                      boxShadow: "20px 20px 20px ",
                      borderRadius: 9999,
                      filter: "blur(120px)",
                    }}
                  />
                  <Box
                    style={{
                      width: 342.34,
                      height: 289.32,
                      left: 0,
                      top: 0,
                      zIndex: "1",
                      position: "absolute",
                      transform: "rotate(30.98deg)",
                      transformOrigin: "0 0",
                      background: "rgba(28, 163, 127, 0.30)",
                      boxShadow: "30px 30px 30px ",
                      borderRadius: 9999,
                      filter: "blur(200px)",
                    }}
                  />
                  <Box
                    style={{
                      width: 106.98,
                      height: 90.41,
                      left: 238.99,
                      zIndex: "1",
                      top: 241.04,
                      position: "absolute",
                      transform: "rotate(30.98deg)",
                      transformOrigin: "0 0",
                      background: "rgba(0, 75.18, 129.62, 0.30)",
                      boxShadow: "20px 20px 20px ",
                      borderRadius: 9999,
                      filter: "blur(120px)",
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box className="contact__Details">
          <Box className="contactGradient">
            <Box className="contactGradient__box1"></Box>
            <Box className="contactGradient__box2"></Box>
          </Box>
          <Box>
            <Box className="contact__FormDetails" id={"contactform"}>
              <Box className="contactTitle">
                <Box className="contactTitle__inside">
                  <Typography variant="h1">
                    {contactFormContent?.subHeading}
                  </Typography>
                  <Typography
                    variant="h6"
                    dangerouslySetInnerHTML={{
                      __html: contactDec,
                    }}
                  ></Typography>
                </Box>
              </Box>

              <Box className="contactForm">
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="standard"
                      name="name"
                      type="text"
                      label={contactFormContent?.Name}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="standard"
                      name="firma"
                      type="text"
                      label={contactFormContent?.Business}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="standard"
                      name="email"
                      type="email"
                      label={contactFormContent?.Email}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      variant="standard"
                      name="teleNumber"
                      type="number"
                      label={contactFormContent?.CallNumber}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="standard"
                      name="nachricht"
                      type="text"
                      label={contactFormContent?.Message}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Box className="contactBtn">
                  <Button variant="contained" className="button">
                    {contactHeader?.attributes?.ButtonText} <TrendingFlatIcon />
                  </Button>
                </Box>

                <Box className="contactFormGradient">
                  <Box className="contactFormGradient__box1">
                    <Box className="contactFormGradient__box2" />
                    <Box className="contactFormGradient__box3" />
                    <Box className="contactFormGradient__box4" />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
