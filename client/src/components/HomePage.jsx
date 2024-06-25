//import HomeButton from "./HomeButton";
import "./HomePage.css";
//import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
export default function HomePage() {

  
  
  return (
    <>
     
      <section className="content">
      
        <h1>nutri<span>Scan</span></h1>
        <h2>Discover the future of nutrition with our advanced food packet scanner, <br/>empowering you to effortlessly check and track nutrient information</h2>
        <NavLink to="/upload" className="btn light">Get started </NavLink>
        {/* <HomeButton link="/upload" onClick={handleButtonClick}/> */}
      </section>
      <section>

      </section>
    </>
  );
}
