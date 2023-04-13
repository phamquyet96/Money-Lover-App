import './App.css';
import {Route, Routes} from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Logout from "./components/Logout/Logout";
import Login from "./components/Login/Login";
import Forgot from "./components/Forgot_pass/Forgot";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/logout" element={<Logout/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/forgot" element={<Forgot/>}></Route>
      </Routes>
  );
}

export default App;

