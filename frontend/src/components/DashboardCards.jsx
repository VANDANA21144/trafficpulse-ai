import { useEffect, useState } from "react";
import API from "../api/api";

function DashboardCards() {

  const [summary, setSummary] = useState({
    critical: 0,
    high: 0,
    total: 0
  });

  useEffect(() => {
    API.get("/summary")
      .then((res) => {
        setSummary(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        margin: "30px"
      }}
    >
      <div className="card">
        <h2>{summary.critical}</h2>
        <p>Critical Stations</p>
      </div>

      <div className="card">
        <h2>{summary.high}</h2>
        <p>High Risk Stations</p>
      </div>

      <div className="card">
        <h2>{summary.total}</h2>
        <p>Total Stations</p>
      </div>
    </div>
  );
}

export default DashboardCards;