import React, { useEffect, useState } from "react";
import { Modal, Button, Input } from "antd";
import style from "./style.module.scss";

const ModalComponent = ({ showModal, setShowModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [medicineData, setMedicineData] = useState({
    name: "",
    quantity: "",
    addedDate: "",
    manufactureDate: "",
    expireDate: "",
    userId: "",
    userName: "",
    phoneNumber: "",
    address: "",
  });
  const hideModal = () => {
    setIsModalOpen(false);
    setShowModal(false);
  };
  useEffect(() => {
    setIsModalOpen(showModal);
  }, [showModal]);

  const inputArray = [
    {
      field: "medicineName",
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

  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (field, value) => {
    let data = { ...medicineData };
    data[field] = value;
    setMedicineData(data);
  };

  return (
    <Modal open={isModalOpen} footer={null} onCancel={hideModal}>
      <div className={style.modal}>
        <div className={style.modal_header}>Add Medicine Data</div>
        <div className={style.modal_body}>
          {inputArray.map((fieldData, index) => {
            return (
              <div className={style.input_fields} key={index}>
                <div className={style.label}>{fieldData.label}</div>
                <Input
                  autoComplete="off"
                  status={
                    !isValid && medicineData[fieldData.field] == ""
                      ? "error"
                      : null
                  }
                  placeholder={`input ${fieldData.field}`}
                  value={medicineData[fieldData.field]}
                  onChange={(e) => {
                    handleInputChange(fieldData.field, e.target.value);
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className={style.modal_footer}>
          <Button onClick={hideModal}>Cancel</Button>
          <Button className={style.action_btn}>Add </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
