import React, { useEffect, useState } from "react";
import { Button, Input, Select, notification } from "antd";
import style from "./style.module.scss";
import { State, City } from "country-state-city";
import { useAuth } from "../../context/login";
import { Navigate } from "react-router-dom";
import { addUser } from "../../services/user";
import { validateObject } from "../../utils/helper";
const RegisterComponent = ({ setShowLogin }) => {
  const { registerUser, access } = useAuth();
  const [cities, setCities] = useState([{}]);
  const [states, setStates] = useState([]);
  const [invalidKey, setInvalidKey] = useState([]);
  useEffect(() => {
    setStates(State.getStatesOfCountry("IN"));
    setCities(City.getCitiesOfState("IN", "CT"));
  }, []);

  const changeCityList = (stateCode) => {
    setCities(City.getCitiesOfState("IN", stateCode));
  };
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    password: "",
    country: "",
    state: "",
    city: "",
    address: "",
  });

  const inputArray = [
    {
      field: "firstname",
      label: "First Name",
      fieldType: "text",
    },
    {
      field: "lastname",
      label: "Last Name",
      fieldType: "text",
    },

    {
      field: "phonenumber",
      label: "Phone Number",
      fieldType: "text",
    },
    // {
    //   field: "country",
    //   label: "Country",
    //   fieldType: "select",
    // },
    {
      field: "state",
      label: "State",
      fieldType: "select",
    },
    {
      field: "city",
      label: "City",
      fieldType: "select",
    },
    {
      field: "address",
      label: "Address",
      fieldType: "text",
    },
    {
      field: "email",
      label: "Email",
      fieldType: "text",
    },
    {
      field: "password",
      label: "Password",
      fieldType: "password",
    },
  ];

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, msg) => {

    api[type]({
      message: "Notification Title",
      description: msg,
    });
  };

  const handleInputChange = (field, value) => {
    let data = { ...userData };
    data[field] = value;
    setUserData(data);
  };

  const handleCityChange = (value, label, field) => {
    let data = { ...userData };
    data[field] = label.label;
    data.country = "INDIA";

    setUserData(data);
    if (field === "state") setCities(City.getCitiesOfState("IN", value));
  };

  const onSubmit = async () => {
    const validArray = validateObject(userData);
    if (validArray.length > 0) {
      setInvalidKey(validArray);
      openNotificationWithIcon("error", "Incorrect Field Value.");
      return;
    }
    const res = await registerUser(userData.email, userData.password);
    if (res) {
      await addUser(res.uid, userData);
    } else {
      //
    }
  };

  return access ? (
    <Navigate to="/" replace />
  ) : (
    <div className={style.register_container}>
      <div className={style.input_field_container}>
        <div className={style.wrapper}>
          <div className={style.header}>
            <div className={style.title}>Register</div>
            <div className={style.sub_title}>
              Enter your credential to access your account.{contextHolder}
            </div>
          </div>

          {inputArray.map((fieldData, index) => {
            switch (fieldData.fieldType) {
              case "text":
                return (
                  <div className={style.input_fields} key={index}>
                    <div className={style.label}>{fieldData.label}</div>
                    <Input
                      autoComplete="off"
                      status={
                        invalidKey.includes(fieldData.field) ? "error" : null
                      }
                      placeholder={`input ${fieldData.label}`}
                      value={userData[fieldData.field]}
                      onChange={(e) => {
                        handleInputChange(fieldData.field, e.target.value);
                      }}
                    />
                  </div>
                );
              case "select":
                return (
                  <div className={style.input_fields} key={index}>
                    <div className={style.label}>{fieldData.label}</div>
                    <Select
                      defaultValue={"Select States"}
                      className={style.select}
                      status={
                        invalidKey.includes(fieldData.field) ? "error" : null
                      }
                      onSelect={(value, label) => {
                        if (fieldData.field === "state")
                          handleCityChange(value, label, "state");
                        else handleCityChange(value, label, "city");
                      }}
                      options={
                        fieldData.field === "state"
                          ? states.map((val, ind) => {
                              return {
                                value: val.isoCode,
                                label: val.name,
                              };
                            })
                          : cities.map((val, ind) => {
                              return {
                                value: val.name,
                                label: val.name,
                              };
                            })
                      }
                    />
                  </div>
                );
              case "password":
                return (
                  <div className={style.input_fields} key={index}>
                    <div className={style.label}>{fieldData.label}</div>
                    <Input.Password
                      autoComplete="off"
                      status={
                        invalidKey.includes(fieldData.field) ? "error" : null
                      }
                      placeholder="input password"
                      value={userData["password"]}
                      onChange={(e) => {
                        handleInputChange("password", e.target.value);
                      }}
                    />
                  </div>
                );
              default:
                <></>;
            }
          })}

          <div className={style.input_fields}>
            <Button style={{ width: "100%" }} type="primary" onClick={onSubmit}>
              Register
            </Button>
          </div>
          <div className={style.footer}>
            Already have an account?{" "}
            <span
              onClick={() => {
                setShowLogin(true);
              }}
            >
              Login here.
            </span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
