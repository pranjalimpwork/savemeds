import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import { Button, Table, Space, Skeleton, Avatar } from "antd";
import ModalComponent from "./modal";
import { useAuth } from "../../context/login";
import { Navigate } from "react-router-dom";
import { getUser } from "../../services/user";
import { getUserAddedMedicine, deleteData } from "../../services/database";
import { dashboardTableColums } from "../../utils/data";
const DashBoardComponent = () => {
  const { access, user } = useAuth();
  const [medicineData, setMedicineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getUserData = async () => {
    const res = await getUser(user.uid);
    setUserInfo({ ...res, id: user.uid });
    setLoading(false);

  };

  useEffect(() => {
    getUserData();
    if (user) {
      getUserAddedMedicine(user.uid, setMedicineData);
    }
  }, []);



  return access ? (
    !loading ? (
      <div className={style.dashboard_section}>
        <div className={style.context_section}>
          <div className={style.header}>
            <div className={style.main_txt}>
              Welcome Back, {userInfo.firstname} {userInfo.lastname}
            </div>
            <div className={style.sub_contxt}>
            Please donate the unused medicines. It will be a huge contribution to our service.
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
              <Table
                className={""}
                columns={dashboardTableColums}
                dataSource={medicineData}
              />
            </div>
          </div>
        </div>
        <div className={style.profile_info}>
          <div className={style.profile_img_box}>
            <Avatar className={style.profile_avatar} size="large">
              {userInfo.firstname.substring(0, 1)}
            </Avatar>
          </div>
          <div className={style.user_info}>
            <div className={style.user_name}>
              {" "}
              {userInfo.firstname} {userInfo.lastname}{" "}
            </div>
            <div className={style.user_data}>
              {Object.entries(userInfo).map((data_fields, index) => {
                const [field, value] = data_fields;
                if (
                  !field.includes("first") &&
                  !field.includes("last") &&
                  !field.includes("password") &&
                  !field.includes("id")
                )
                  return (
                    <div className={style.data_field}>
                      <div className={style.field}>{field}</div>
                      <div className={style.value}>{value}</div>
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
        <ModalComponent
          showModal={showModal}
          setShowModal={setShowModal}
          userData={userInfo}
        />
      </div>
    ) : (
      <div className={style.skeleton_container}>
        <Skeleton style={{ width: "80%", margin: "50px auto" }} active />
        <Skeleton style={{ width: "80%", margin: "100px auto" }} active />
        <Skeleton style={{ width: "80%", margin: "20px auto" }} active />
      </div>
    )
  ) : (
    <Navigate to="/login" replace />
  );
};

export default DashBoardComponent;
