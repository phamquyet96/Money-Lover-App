import './App.css';
import {Route, Routes} from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Logout from "./components/Logout/Logout";
import Login from "./components/Login/Login";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/logout" element={<Logout/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
  );
}

export default App;

