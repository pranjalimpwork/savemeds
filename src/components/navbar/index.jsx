import React, { useEffect, useState } from "react";
import "./style.scss";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const NavbarComponent = () => {
  //   const location = useLocation();
  const [currentRoute, setcurrentRoute] = useState("/");
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
    },
    {
      url: "/about",
      title: "About",
    },
    {
      url: "/login",
      title: "Login",
    },
  ];
  useEffect(() => {
    setcurrentRoute(window.location.pathname);
  }, []);

  return (
    <div>
      <div className="topnav" id="myTopnav">
        <a href="#home" className="logo">
          <img src="/img/logo.png" alt="" />
        </a>
        {urlLinks.map((val, ind) => {
          return (
            <Link
              to={val.url}
              className={currentRoute == val.url ? "active" : ""}
              onClick={() => setcurrentRoute(val.url)}
            >
              {val.title}
            </Link>
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
