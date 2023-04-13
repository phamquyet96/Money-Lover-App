import './App.css';
import {Route, Routes} from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Logout from "./components/Logout/Logout";
<<<<<<< HEAD
import Login from "./components/Login-Register/Login";
import Register from "./components/Login-Register/Register";
=======
import Login from "./components/Login/Login";
import Forgot from "./components/Forgot_pass/Forgot";
>>>>>>> fcd3f79 (forgot passworld)

function App() {
  return (
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/logout" element={<Logout/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
<<<<<<< HEAD
        <Route path="/register" element={<Register/>}></Route>
=======
        <Route path="/forgot" element={<Forgot/>}></Route>
>>>>>>> fcd3f79 (forgot passworld)
      </Routes>
  );
}

export default App;

