import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import "../../styles/banner.scss";

interface bannerDataType {
  activeUser: number;
  companyTrust: number;
  createdAt: string;
  publishedAt: string;
  transaction: number;
  updatedAt: string;
}

const Banner = () => {
  const [banners, setBanners] = useState<bannerDataType>();
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );

  useEffect(() => {
    (async () => {})();

    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  const getBanner = async () => {
    try {
      const response = await axios.get("https://cms.apfelherz.com/api/banners");
      setBanners(response?.data?.data[0].attributes);
    } catch (error) {
      console.log("---", error);
    }
  };

  useEffect(() => {
    getBanner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  return (
    <>
      <Container className="numberSection">
        <Box className="numberDetails">
          <Typography variant="h1">{banners?.activeUser}+</Typography>

          <Typography variant="h6">ACTIVE BUYER</Typography>
        </Box>
        <Box className="numberDetails">
          <Typography variant="h1">{banners?.companyTrust}+</Typography>
          <Typography variant="h6">COMPANY TRUSTED</Typography>
        </Box>
        <Box className="numberDetails">
          <Typography variant="h1">{banners?.transaction}M€</Typography>
          <Typography variant="h6">TRANSACTION</Typography>
        </Box>
      </Container>
    </>
  );
};

export default Banner;
