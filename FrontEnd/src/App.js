import './App.css';
import {Route, Routes} from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Logout from "./components/Logout/Logout";
import Login from "./components/Login-Register/Login";
import Register from "./components/Login-Register/Register";
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/logout" element={<Logout/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
      </Routes>
  );
}

export default App;
