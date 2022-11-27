import React, { useEffect, useState } from "react";
import { Button, Input, Select } from "antd";
import style from "./style.module.scss";
import { Country, State, City } from "country-state-city";
import { useAuth } from "../../context/login";
import { Navigate } from "react-router-dom";
import { addUser } from "../../services/user";
const RegisterComponent = ({ setShowLogin }) => {
  const { registerUser, access } = useAuth();
  const onSearch = (value) => console.log(value);
  const [cities, setCities] = useState([{}]);
  const [states, setStates] = useState([]);

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
    {
      field: "country",
      label: "Country",
      fieldType: "select",
    },
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
      label: "PassWord",
      fieldType: "password",
    },
  ];

  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (field, value) => {
    let data = { ...userData };
    data[field] = value;
    setUserData(data);
  };
  const onSubmit = async () => {
    if (userData.email === "") {
      setIsValid(false);
      return;
    }
    if (userData.email === "") {
      setIsValid(false);
      return;
    }
    if (isValid) {
      // const res = await registerUser(userData.email, userData.password);
      // if (res) {
      //   await addUser(res.uid, userData);
      // } else {
      //   //
      // }
    }
  };

  useEffect(() => {
    console.log("access", access);
  }, []);

  return access ? (
    <Navigate to="/" replace />
  ) : (
    <div className={style.register_container}>
      <div className={style.input_field_container}>
        <div className={style.wrapper}>
          <div className={style.header}>
            <div className={style.title}>Register</div>
            <div className={style.sub_title}>
              Enter your credential to access your account.
            </div>
          </div>

          {inputArray.map((fieldData, index) => {
            return (
              <div className={style.input_fields} key={index}>
                <div className={style.label}>{fieldData.label}</div>
                {fieldData.fieldType == "text" ? (
                  <Input
                    autoComplete="off"
                    status={
                      !isValid && userData[fieldData.field] == ""
                        ? "error"
                        : null
                    }
                    placeholder={`input ${fieldData.field}`}
                    value={userData[fieldData.field]}
                    onChange={(e) => {
                      handleInputChange(fieldData.field, e.target.value);
                    }}
                  />
                ) : fieldData.fieldType == "select" ? (
                  <Select
                    defaultValue={"Select States"}
                    className={style.select}
                    onChange={changeCityList}
                    options={states.map((val, ind) => {
                      return {
                        value: val.isoCode,
                        label: val.name,
                      };
                    })}
                  />
                ) : (
                  <Input.Password
                    autoComplete="off"
                    status={
                      !isValid && userData["password"] == "" ? "error" : null
                    }
                    placeholder="input password"
                    value={userData["password"]}
                    onChange={(e) => {
                      handleInputChange("password", e.target.value);
                    }}
                  />
                )}
              </div>
            );
          })}

          <div className={style.input_fields}>
            <div className={style.label}>Password</div>
            <Input.Password
              autoComplete="off"
              status={!isValid && userData["password"] == "" ? "error" : null}
              placeholder="input password"
              value={userData["password"]}
              onChange={(e) => {
                handleInputChange("password", e.target.value);
              }}
            />
          </div>
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
