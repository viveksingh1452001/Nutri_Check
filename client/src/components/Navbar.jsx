import React,{useState} from "react";
import { NavLink } from "react-router-dom";
// import '../../public/favicon.icon'
import NUTRISCAN from '../assets/nutriScan_transparent.png'
import "./Navbar.css";


const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const makeFalse=()=>{
      setShowDropdown(false);
      setIsChecked(false)
    }

    const [isChecked, setIsChecked] = useState(false);

    const handleLogoClick = () => {
        setIsChecked(!isChecked); // Toggle isChecked state
    };
  return (
    <>
      <header className="navContainer">
        {/* <input type="checkbox" id="check" /> */}
        
        <label className="checkbox-container" htmlFor="check">
          <img src={NUTRISCAN} alt="Logo" onClick={handleLogoClick}/>
        </label>
        <input type="checkbox" checked={isChecked}  id="check" onChange={() => {}} />
        <nav className="navbars">
          <NavLink to="/" className="nav-items" onClick={makeFalse}  style={{ "--i": 0 }}>
            Home
          </NavLink>
          <NavLink to="/upload" className="nav-items" onClick={makeFalse} style={{ "--i": 1 }}>
            Upload Image
          </NavLink>
          <NavLink to="/scan" className="nav-items" onClick={makeFalse} style={{ "--i": 2 }}>
            Scanner
          </NavLink>
          <span className="dropdown nav-items">
                    <div className="dropbtn " onClick={toggleDropdown} style={{ "--i": 3 }}>Dropdown<i className="fa-solid fa-angle-down"></i></div>
                    {showDropdown && (
                        <div className="dropdown-content" >
                            <NavLink to="/myth" onClick={makeFalse} activeclassname="active" >Myth busters</NavLink>
                            <NavLink to="/option2" onClick={makeFalse} activeclassname="active">How to read labels</NavLink>
                            <NavLink to="/option3" onClick={makeFalse} activeclassname="active">Reduction of fat, sugar & salt</NavLink>
                        </div>
                    )}
                </span>
          <NavLink to="/contact" onClick={makeFalse} className="nav-items" style={{ "--i": 4 }}>
            Contact
          </NavLink>
        </nav>
      </header>

    </>
  );
};

export default Navbar;
