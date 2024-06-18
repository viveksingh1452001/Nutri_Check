import React from "react";
import Scanner from "./pages/Scanner";
import HomePage from "./components/HomePage";
import {Routes, Route} from 'react-router-dom'
// import ScannerBase from "./pages/ScannerBase";


const App = () => {
  

  return (
    <>
      <h1>Food Label Extracter</h1>
      <Routes>
        <Route exact path='/' element={<HomePage/>}/>
        <Route path='/upload' element={<Scanner/>}/>
      </Routes>
      {/* <ScannerBase/> */}
    </>
  );
};

export default App;




