import React, { useState } from "react";
import style from "./style.module.scss";
import { Button, Table, Space } from "antd";
import ModalComponent from "./modal";
import { useAuth } from "../../context/login";
import { Navigate } from "react-router-dom";

const DashBoardComponent = () => {
  const { access, user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Added Data",
      dataIndex: "addedDate",
      key: "addedDate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      quantity: 32,
      addedDate: 32,
    },
    {
      key: "2",
      name: "Jim Green",
      addedDate: 32,
      quantity: 32,
    },
  ];
  return access ? (
    <div className={style.dashboard_section}>
      <div className={style.context_section}>
        <div className={style.header}>
          <div className={style.main_txt}>Welcome Back, Pranjal Tiwari</div>
          <div className={style.sub_contxt}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
            doloribus!
          </div>
        </div>
        <div className={style.action_btn_container}>
          <Button
            className={style.action_btn}
            onClick={() => setShowModal(true)}
            shape="round"
          >
            {" "}
            Add Medicine{" "}
          </Button>
        </div>
        <div className={style.table_container}>
          <div className={style.table_header}>Added Medicines</div>
          <div className={style.table}>
            <Table className={""} columns={columns} dataSource={data} />
          </div>
        </div>
      </div>
      <div className={style.profile_info}>
        <div className={style.profile_img_box}></div>
      </div>
      <ModalComponent showModal={showModal} setShowModal={setShowModal} />
    </div>
  ) : (
    <Navigate to="/" replace />
  );
};

export default DashBoardComponent;
