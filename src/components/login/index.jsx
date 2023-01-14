import React, { useState } from "react";
import { Button, Input, notification } from "antd";
import style from "./style.module.scss";
import { useAuth } from "../../context/login";
import { Navigate } from "react-router-dom";

const LoginComponent = ({ setShowLogin }) => {
  const { access, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, msg) => {

    api[type]({
      message: "Notification Title",
      description: msg,
    });
  };

  const onSubmit = async () => {
    if (email === "") {
      setIsValid(false);
      return;
    }
    if (password === "") {
      setIsValid(false);
      return;
    }
    if (isValid) {
      const res = login(email, password);
      let output = await res;
      if (output === undefined || output === null) {
        openNotificationWithIcon("error", "Incorrect Email or Password.");
        return;
      }
      openNotificationWithIcon("success", "Login Successfully.");
    }
  };

  return access ? (
    <Navigate to="/" replace />
  ) : (
    <div className={style.login_container}>
      <div className={style.input_field_container}>
        <div className={style.wrapper}>
          <div className={style.header}>
            <div className={style.title}>Login</div>
            <div className={style.sub_title}>
              Enter your credential to access your account. {contextHolder}
            </div>
          </div>
          <div className={style.input_fields}>
            <div className={style.label}>Email</div>
            <Input
              autoComplete="off"
              status={!isValid && email === "" ? "error" : null}
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
              status={!isValid && password === "" ? "error" : null}
              placeholder="input password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className={style.input_fields}>
            <Button style={{ width: "100%" }} type="primary" onClick={onSubmit}>
              Login
            </Button>
          </div>
          <div className={style.footer}>
            Don’t have an account?{" "}
            <span
              onClick={() => {
                setShowLogin(false);
              }}
            >
              Register here
            </span>{" "}
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
