import React from "react";
import { Box } from "@mui/material";
import HeroSection from "../../component/home/HeroSection";
import FeaturedTestimonials from "../../component/home/FeaturedTestimonials";
import Banner from "../../component/home/Banner";
import ContactForm from "../../component/home/ContactForm";
import Customers from "../../component/home/Customers";
import Company from "../../component/home/Company";
import Workplace from "../../component/home/Workplace";
import CompanySolutions from "../../component/home/CompanySolutions";
import CompanyNeeds from "../../component/home/CompanyNeeds";
import "../../styles/dashboard.scss";

const Dashboard = () => {
  return (
    <>
      <Box className="mainContent">
        <HeroSection />
        <Banner />
        <CompanyNeeds />
        <CompanySolutions />
        <Workplace />
        <FeaturedTestimonials />
        <Company />
        <ContactForm />
        {/* <Customers /> */}
      </Box>
    </>
  );
};

export default Dashboard;
