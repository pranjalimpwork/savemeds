import logo from "./logo.svg";
import "./App.css";
import AuthenticationPage from "./pages/authentication";
import HomePage from "./pages/home";
import FooterComponent from "./components/footer";
import NavbarComponent from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUsPage from "./pages/about";
import SearchPage from "./pages/search";
import AuthProvider from "./components/context/auth";
function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <NavbarComponent />
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/about" element={<AboutUsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="*" element={<HomePage />} />
            <Route path="/login" element={<AuthenticationPage />} />
          </Routes>

          <FooterComponent />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
