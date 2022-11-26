import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import style from "./style.module.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";
import { useAuth } from "../context/login";
import { Navigate } from "react-router-dom";

const RegisterComponent = ({ setShowLogin }) => {
  const { registerUser, access } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const onSubmit = () => {
    if (email === "") {
      setIsValid(false);
      return;
    }
    if (password === "") {
      setIsValid(false);
      return;
    }
    if (isValid) {
      registerUser(email, password);
      // createUserWithEmailAndPassword(auth, email, password)
      //   .then((userCredential) => {
      //     console.log("User--", userCredential);
      //     const user = userCredential.user;
      //   })
      //   .catch((error) => {});
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
          <div className={style.input_fields}>
            <div className={style.label}>Name</div>
            <Input
              autoComplete="off"
              status={!isValid && name == "" ? "error" : null}
              placeholder="input name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className={style.input_fields}>
            <div className={style.label}>Email</div>
            <Input
              autoComplete="off"
              status={!isValid && email == "" ? "error" : null}
              placeholder="input email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className={style.input_fields}>
            <div className={style.label}>Password</div>
            <Input.Password
              autoComplete="off"
              status={!isValid && password == "" ? "error" : null}
              placeholder="input password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
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
      <div
        className={style.img_wrapper}
        style={{
          backgroundImage: `url(${"https://i.pinimg.com/564x/d2/fb/ec/d2fbecc532de1b53f5b6bd1e1b7a913d.jpg"})`,
        }}
      ></div>
    </div>
  );
};

export default RegisterComponent;
