import React from "react";
import style from "./style.module.scss";
const LandingSection = () => {
  return (
    <div className={style.landing_section}>
      <div className={style.context_part}>
        <div className={style.title}>About Us</div>
        <div className={style.sub_title}>Who are we?.</div>
      </div>
      <div className={style.img_part}></div>
    </div>
  );
};

export default LandingSection;
