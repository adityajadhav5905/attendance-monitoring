// src/pages/FacultyPortalWrapper.jsx

import React from "react";
import { useParams } from "react-router-dom";
import FacultyPortal from "./FacultyPortal";

const FacultyPortalWrapper = () => {
  const { batch } = useParams();
  return <FacultyPortal batch={batch} />;
};

export default FacultyPortalWrapper;
