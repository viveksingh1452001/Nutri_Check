import React from "react";
import Scanner from "./pages/Scanner";
import HomePage from "./components/HomePage";
import {Routes, Route} from 'react-router-dom'
import { useLayoutEffect } from "react";
import Navbar from "./components/Navbar";
import './App.css'
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Myth from "./pages/Myth";
//import Sidebar from "./components/Sidebar";
// import ScannerBase from "./pages/ScannerBase";


const App = () => {
  useLayoutEffect(() => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
      loader.classList.add("loaded");
      setTimeout(() => {
        document.body.removeChild(loader);
      }, 3000);
    }, 1000);
  }, []);

  return (
    <div className="div_container" >
    <Navbar/>
     <Routes>
       <Route exact path='/' element={<HomePage/>}/>
       <Route path='/upload' element={<Scanner/>}/>
       <Route path='/contact' element={<Contact/>}/>
       <Route path='/myth' element={<Myth/>}/>
       
     </Routes>
     <Footer/>
    </div>
  );
};

export default App;




