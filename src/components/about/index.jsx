import React from "react";
import LandingSection from "./landing";
import "./style.scss";
const AboutComponent = () => {
  return (
    <div>
      <LandingSection />
      <div className="why_us_section">
        <div className="wrapper">
          <div className="img_box"></div>
          <div className="context_wrapper">
            <div className="title">WHY CHOOSE US?</div>
            <div className="descp">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              reiciendis exercitationem esse commodi alias dolor, consequuntur
              itaque excepturi nulla cum.
            </div>
            <div className="descp">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              reiciendis exercitationem esse commodi alias dolor, consequuntur
              itaque excepturi nulla cum.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
