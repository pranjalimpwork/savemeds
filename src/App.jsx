import logo from "./logo.svg";
import "./App.css";
import AuthenticationPage from "./pages/authentication";
import HomePage from "./pages/home";
import FooterComponent from "./components/footer";
import NavbarComponent from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutUsPage from "./pages/about";
function App() {
  return (
    <>
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="*" element={<HomePage />} />
          <Route path="/login" element={<AuthenticationPage />} />
        </Routes>

        <FooterComponent />
      </Router>
    </>
  );
}

export default App;
