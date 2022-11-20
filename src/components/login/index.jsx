import React, { useState } from "react";
import { Button, Input } from "antd";
import style from "./style.module.scss";
const LoginComponent = ({ setShowLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);
  const onSubmit = () => {
    if (email === "") setIsValid(false);
    if (password === "") setIsValid(false);
  };
  return (
    <div className={style.login_container}>
      <div className={style.input_field_container}>
        <div className={style.wrapper}>
          <div className={style.header}>
            <div className={style.title}>Login</div>
            <div className={style.sub_title}>
              Enter your credential to access your account.
            </div>
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
      <div
        className={style.img_wrapper}
        style={{
          backgroundImage: `url(${"https://i.pinimg.com/564x/92/1c/d4/921cd4bc2663d22cf4ad08601725e816.jpg"})`,
        }}
      ></div>
    </div>
  );
};

export default LoginComponent;
