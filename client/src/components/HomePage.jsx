import React from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h2>Welcome to the MERN Stack Project!</h2>
      <p>This is the homepage of your MERN stack project.</p>
      <p>
        Choose an option to navigate:
        
      </p>
      <NavLink to='/upload'>UPLOAD</NavLink>
    </div>
  );
};

export default HomePage;
