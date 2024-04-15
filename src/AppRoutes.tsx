import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Layout from "./component/Layout/Layout";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import Imprint from "./pages/Imprint";
import DataProtection from "./pages/DataProtection";

const AppRoutes = () => {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/imprint" element={<Imprint />} />
        <Route path="/dataProtection" element={<DataProtection />} />
      </Route>
      <Route
        path="*"
        element={<h1>Sorry, we dont have any page like this</h1>}
      />
    </Routes>
  );
};

export default AppRoutes;
