import React from "react";
import { Link } from "react-router-dom";
import style from "./style.module.scss";
const LandingSection = () => {
  return (
    <div className={style.landing_section}>
      <div className={style.context_part}>
        <div className={style.title}>Welcome to the Save Meds</div>
        <div className={style.sub_title}>
          Our work aims to break the vicious cycle of poverty and social
          isolation and to restore hope for a better future.
        </div>
        <Link to={"/search"}>
          <button className={style.action_btn}>Search</button>
        </Link>
        <Link to={"/dashboard"}>
          <button className={style.action_btn}>Donate</button>
        </Link>
      </div>
      <div className={style.img_part}></div>
    </div>
  );
};

export default LandingSection;
