import React from "react";
import Sidebar from "../sidebar/Sidebar";
import MainDash from "../MainDash/MainDash";
import RightSide from "../RigtSide/RightSide";
import "./MainDashSection.css";
import Header from "../../header/Header";
const MainDashSection = () => {
  return (
    <>
      <Header />
      <div className="DashApp">
        <div className="DashAppGlass">
          <Sidebar />
          <MainDash />
          <RightSide />
          
        </div>
        
      </div>
      <div class="row copyright">
          
          <p style={{color:'white'}}>Copyright &copy; 2023 Secure Ration Developer</p>
        </div>
    </>
  );
};

export default MainDashSection;
