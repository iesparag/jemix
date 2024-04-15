import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/system";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "@mui/material";

function Layout() {
  return (
    <Box>
      <Container className="Header">
        <Header />
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
}

export default Layout;
