import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLanguage } from "../../redux/feature/language/languageSlice";
import { RootState } from "../../redux/store";

const Language = () => {
  const dispatch = useDispatch();
  const [language, setLanguage] = useState<string>("German");
  const currentLanguage = useSelector(
    (state: RootState) => state.language.language
  );
  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value as string);
    dispatch(setCurrentLanguage(event.target.value));
  };
  return (
    <Select
      value={currentLanguage}
      onChange={handleChange}
      className="mainHeader__menu-select"
    >
      <MenuItem value={`English`}>English</MenuItem>
      <MenuItem value={`German`}>German</MenuItem>
    </Select>
  );
};

export default Language;
