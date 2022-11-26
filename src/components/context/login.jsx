import { createContext, useContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: null,
  user: null,
  login: () => {},
  logout: () => {},
  loading: null,
  token: null,
  access: null,
  getProfileData: () => {},
});

export const useAuth = () => useContext(AuthContext);
