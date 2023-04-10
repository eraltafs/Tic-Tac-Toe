import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Page not found</h1>
      <div>
        <h3 onClick={() => navigate("/")}>Navigate to homepage</h3>
      </div>
    </div>
  );
};

export default PageNotFound;