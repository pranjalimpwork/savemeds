import React, { useEffect, useState } from "react";
import "./style.scss";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/login";
const NavbarComponent = () => {
  const location = useLocation();
  const { access, logout } = useAuth();
  const [currentRoute, setcurrentRoute] = useState(location.pathname);
  function myFunction() {
    console.log("ara", window.location.hash);
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  const urlLinks = [
    {
      url: "/home",
      title: "Home",
      show: true,
    },
    {
      url: "/about",
      title: "About",
      show: true,
    },
    {
      url: "/search",
      title: "Search",
      show: true,
    },
    {
      url: "/dashboard",
      title: "Dashboard",
      show: access,
    },
    {
      url: "/login",
      title: "Login",
      show: !access,
    },
    {
      url: "/logout",
      title: "Logout",
      show: access,
    },
  ];
  useEffect(() => {
    setcurrentRoute(location.pathname);
  }, [location]);

  return (
    <div>
      <div className="topnav" id="myTopnav">
        <a href="#home" className="logo">
          <img src="/img/logo.png" alt="" />
        </a>
        {urlLinks.map((val, ind) => {
          return val.show ? (
            <Link
              to={val.url}
              className={currentRoute == val.url ? "active" : ""}
              onClick={() => {
                setcurrentRoute(val.url);
                if (val.url.includes("logout")) logout();
              }}
            >
              {val.title}
            </Link>
          ) : (
            ""
          );
        })}

        <a
          href="javascript:void(0);"
          className="icon"
          onClick={() => myFunction()}
        >
          <MenuOutlined />
        </a>
      </div>
    </div>
  );
};

export default NavbarComponent;
