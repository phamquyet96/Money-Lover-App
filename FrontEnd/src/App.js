import './App.css';
import {Route, Routes} from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Logout from "./components/Logout/Logout";
import Login from "./components/Login-Register/Login";
import Register from "./components/Login-Register/Register";
import Forgot from "./components/Forgot_pass/Forgot";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/auth/logout" element={<Logout/>}></Route>
        <Route path="/auth/login" element={<Login/>}></Route>
        <Route path="/auth/register" element={<Register/>}></Route>
        <Route path="/forgot" element={<Forgot/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
  );
}

export default App;
