import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import maskGroup from "../../assets/PNG/maskGroup.png";
import { Box, Button, Typography } from "@mui/material";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import axios from "axios";
import "swiper/css/autoplay";
import "swiper/css";
import "../../styles/featuredtestimonials.scss";

function FeaturedTestimonials() {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );
  const [mainContent, setMainContent] = useState<any>({});
  const [clientReview, setClientReview] = useState([]);
  const [mainHead, setMainHead] = useState<string>("");

  const getSubTitle = async () => {
    try {
      const response = await axios.get(
        `https://cms.apfelherz.com/api/clientre-sections?${
          currentLanguage === "English" ? "locale=en" : "locale=de"
        }`
      );

      setMainContent(response?.data?.data[0]);
      if (currentLanguage === "English") {
        const updatedText =
          response.data.data[0]?.attributes?.mainHeading.replace(
            new RegExp("What customers", "g"),
            `<span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">
          What customers</span>`
          );
        setMainHead(updatedText);
      } else {
        const updatedText =
          response.data.data[0]?.attributes?.mainHeading.replace(
            new RegExp("Was Kunden", "g"),
            `<span style="background: linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%); -webkit-background-clip: text; color: transparent;">
            Was Kunden</span>`
          );
        setMainHead(updatedText);
      }
    } catch (error) {
      console.log("---", error);
    }
  };

  const getClientRev = async () => {
    try {
      const response = await axios.get(
        `https://cms.apfelherz.com/api/clientreviews?${
          currentLanguage === "English" ? "locale=en" : "locale=de"
        }&&populate=*`
      );
      setClientReview(response?.data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getSubTitle();
    getClientRev();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);
  return (
    <>
      <Box className="featured" id={currentLanguage === "English" ? "credentials" : "referenzen"}>
        <Box className="headArea">
          <Box className="textPart">
            <Typography
              variant="h1"
              dangerouslySetInnerHTML={{ __html: mainHead }}
            ></Typography>
            <Typography>{mainContent?.attributes?.description}</Typography>
          </Box>

          <Box>
            <Button variant="contained" className="button">
              {mainContent?.attributes?.buttonText} <ArrowRightAltIcon />
            </Button>
          </Box>
        </Box>

        <Box className="" >
          <Swiper
            autoplay
            slidesPerView={1}
            // modules={[Autoplay]}
            breakpoints={{
              768: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
          >
            {clientReview.map((terminalData: any, index: number) => {
              return (
                <SwiperSlide key={index}>
                  <Box className="swiper" >
                    <Box className="swiperBox">
                      <Box className="images">
                        <Box className="userDetails">
                          <Box className="avatar">
                            <img
                              src={`https://cms.apfelherz.com/${terminalData?.attributes?.ClientImage?.data?.attributes?.url}`}
                              alt="clientImage"
                              className=""
                            />
                          </Box>
                          <Box className="contentArea">
                            <Typography variant="h4">
                              {terminalData.attributes?.ClientName}
                            </Typography>
                            <Box className="role">
                              <span className="">
                                {terminalData.attributes?.ClientRole}
                              </span>
                            </Box>
                          </Box>
                        </Box>
                        <Box className="maskImg">
                          <img src={maskGroup} alt="" className="" />
                        </Box>
                      </Box>

                      <Typography component="p">
                        <i>{terminalData.attributes?.ReviewText}</i>
                      </Typography>
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Box>
    </>
  );
}

export default FeaturedTestimonials;
