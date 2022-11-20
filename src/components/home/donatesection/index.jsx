import React from "react";
import style from "./style.module.scss";
import DonateCard from "../donatecard";
const DonateSection = () => {
  var donateData = [
    {
      name: "Paracetamol",
      img: null,
    },
    {
      name: "Dolo 650",
      img: null,
    },
    {
      name: "Vixs",
      img: null,
    },
  ];
  return (
    <div className={style.donate_section}>
      <div className={style.header}>
        <div className={style.sub_title}>All NGOs</div>
        <div className={style.title}>Donate for NGOs</div>
      </div>
      <div className={style.body}>
        <div className={style.card_section}>
          {donateData.map((val, ind) => {
            return <DonateCard name={val.name} img={val.img} key={ind} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default DonateSection;
