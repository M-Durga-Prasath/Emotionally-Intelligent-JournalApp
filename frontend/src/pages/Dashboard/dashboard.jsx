import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../Navbar/Navbar";
import "./dashboard.css";
import Streak from "./dashboard-features/streak";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <>
    <DashboardNavbar/>
    <div className="dashboard-container">
      <div className="s1"><Streak/></div>
      <div className="s3">Section 3</div>
      <div className="s2">Section 2</div>
      <div className="s4">Section 4</div>
      <div className="s5">Section 5</div>
    </div>
    </>
  );
};

export default Dashboard;