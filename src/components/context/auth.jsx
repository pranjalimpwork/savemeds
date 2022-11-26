import { useState, useEffect } from "react";

import { AuthContext } from "./login";
import { auth } from "../../services/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [access, setAccess] = useState();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = window.localStorage.getItem("token") || "";
      if (typeof token === "string" && token !== "") {
        setAccess(true);
        setToken(token);
        setLoading(false);
      } else {
        setAccess(false);
      }
    }
    loadUserFromCookies();
  }, []);

  const login = async (email, password) => {
    let res = null;
    console.log("emai;", email);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        res = userCredential.user;
        setUser(res);
        setAccess(true);
        setToken(res.accessToken);
        localStorage.setItem("token", res.accessToken);
        console.log(res);
      })
      .catch((error) => {});

    return res;
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        setAccess(false);
        setUser(null);
        setToken(null);
        console.log("logout");
      })
      .catch((error) => {
        console.log("Err", error);
        // An error happened.
      });
  };
  const registerUser = (email, password) => {
    let res = null;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        res = userCredential.user;
        setUser(res);
        setAccess(true);
        localStorage.setItem("token", res.access_token);
        console.log("user--", res);
      })
      .catch((error) => {});
    // return user;
  };

  return (
    <div>
      <AuthContext.Provider
        value={{
          isAuthenticated: !!user,
          user,
          login,
          logout,
          loading,
          token,
          access,
          registerUser,
        }}
      >
        {window ? children : ""}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
