import React, { useEffect, useState } from "react";
import { Modal, Button, Input, DatePicker } from "antd";
import style from "./style.module.scss";
import { addMedicine } from "../../../services/database";
import { validateObject } from "../../../utils/helper";
const ModalComponent = ({ showModal, setShowModal, userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invalidKey, setInvalidKey] = useState([]);
  let defaultState = {
    name: "",
    quantity: "",
    addedDate: "",
    manufactureDate: "",
    expireDate: "",
    userId: userData.id,
    userName: userData.firstname + " " + userData.lastname,
    phoneNumber: userData.phonenumber,
    city: userData.city,
    state: userData.state,
    address: userData.address,
  };
  const [medicineData, setMedicineData] = useState(defaultState);
  const hideModal = () => {
    setIsModalOpen(false);
    setShowModal(false);
    setMedicineData(defaultState);
    setInvalidKey([]);
  };

  const addData = async () => {
    const res = validateObject(medicineData);
    if (res.length > 0) {
      setInvalidKey(res);
      return;
    }
    addMedicine(medicineData);
    hideModal();
  };

  useEffect(() => {
    setIsModalOpen(showModal);
  }, [showModal]);

  const inputArray = [
    {
      field: "name",
      label: "Medicine Name",
    },
    {
      field: "quantity",
      label: "Quantity",
    },

    {
      field: "addedDate",
      label: "Added Date",
    },
    {
      field: "manufactureDate",
      label: "Manufactuing Date",
    },
    {
      field: "expireDate",
      label: "Expire Date",
    },
  ];

  const handleInputChange = (field, value) => {
    let data = { ...medicineData };
    data[field] = value;
    setMedicineData(data);
  };

  return (
    <Modal open={isModalOpen} footer={null} onCancel={hideModal}>
      <div className={style.modal}>
        <div className={style.modal_header}>Add Medicine Data</div>
        {invalidKey.length > 0 && "Please Enter Valid Values"}
        <div className={style.modal_body}>
          {inputArray.map((fieldData, index) => {
            return (
              <div className={style.input_fields} key={index}>
                <div className={style.label}>{fieldData.label}</div>
                {!fieldData.field.includes("Date") ? (
                  <Input
                    autoComplete="off"
                    status={
                      invalidKey.includes(fieldData.field) ? "error" : null
                    }
                    placeholder={`input ${fieldData.field}`}
                    value={medicineData[fieldData.field]}
                    onChange={(e) => {
                      handleInputChange(fieldData.field, e.target.value);
                    }}
                  />
                ) : (
                  <DatePicker
                    className={style.select}
                    status={
                      invalidKey.includes(fieldData.field) ? "error" : null
                    }
                    onChange={(date, dateString) => {
                      handleInputChange(fieldData.field, dateString);
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className={style.modal_footer}>
          <Button onClick={hideModal}>Cancel</Button>
          <Button className={style.action_btn} onClick={addData}>
            Add{" "}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
