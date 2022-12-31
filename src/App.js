import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Adminlogin from "./AdminLogin/Adminlogin";
import Adminsignup from "./AdminSignup/Adminsignup";
import "./Design.css";
import ForgotPassword from "./Forgotpassword/ForgotPassword";
import Dashboard from "./Dashboard";
import Changepassword from "./Forgotpassword/Changepassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Adminlogin />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/Changepassword" element={<Changepassword />}></Route>
          <Route path="/signup" element={<Adminsignup />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
