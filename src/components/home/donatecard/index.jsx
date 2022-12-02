import React from "react";
import style from "./style.module.scss";
import { Button } from "antd";
const DonateCard = ({ name, img }) => {
  return (
    <div className={style.donate_card}>
      <div className={style.img_box}>
        <img
          src={
            img ??
            "https://bristol-labs.co.uk/wp-content/uploads/2015/04/Paracetamol-BP_32-DSC_3631.jpg"
          }
          alt=""
        />
      </div>
      <div className={style.body}>
        <div className={style.name}>{name ?? "Paracetamol"}</div>
        <Button>Donate</Button>
      </div>
    </div>
  );
};

export default DonateCard;
