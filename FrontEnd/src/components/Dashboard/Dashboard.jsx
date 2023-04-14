import * as React from "react";
import Navbar from '../Navbar/Navbar';
import Leftbar from '../Leftbar/Leftbar';


function Dashboard() {
	return (
    <div style={{ backgroundColor: "#e4e4e4" }}>
      <Navbar />
      <Leftbar />
    </div>
  );
}

export default Dashboard;