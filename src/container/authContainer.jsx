import React, { useEffect, useState } from "react";
import LoginComponent from "../components/login";
import RegisterComponent from "../components/resgister";
const AuthContainer = () => {
  const [showLogin, setShowLogin] = useState(true);
  useEffect(() => {
    console.log("showLogin", showLogin);
  }, [showLogin]);

  return (
    <div>
      {showLogin ? (
        <LoginComponent setShowLogin={setShowLogin} />
      ) : (
        <RegisterComponent setShowLogin={setShowLogin} />
      )}
    </div>
  );
};

export default AuthContainer;
