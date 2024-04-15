import React from "react";
import workwith from "../../assets/PNG/workwith.png";
import "../../styles/customers.scss";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Customers = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );
  return (
    <Box>
      <Box className="customers">
        {currentLanguage !== "English" ? (
          <Typography variant="h1">
            Zufriedene
            <span
              style={{
                background:
                  "linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {" "}
              Kunden
            </span>
          </Typography>
        ) : (
          <Typography variant="h1">
            Satisfied
            <span
              style={{
                background:
                  "linear-gradient(130deg, #9B3D64 2.55%, #D45B67 100%)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {" "}
              customers
            </span>
          </Typography>
        )}
        <Box>
          <img src={workwith} alt="work" />
        </Box>
      </Box>
    </Box>
  );
};

export default Customers;
