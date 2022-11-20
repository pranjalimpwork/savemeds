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
              The main aim or objective of this medicine donation system is to
              help poor people for medication. Many needy people will get cured.
            </div>
            <div className="descp">
              With the use of all, all resources can become open to all member
              institutions that operate in different areas at the same time.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
