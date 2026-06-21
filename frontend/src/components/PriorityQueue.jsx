import { useEffect, useState } from "react";
import API from "../api/api";

function PriorityQueue() {

  const [stations, setStations] = useState([]);

  useEffect(() => {
    API.get("/top-stations")
      .then((res) => {
        setStations(res.data.slice(0, 5));
      });
  }, []);

  const getAction = (risk) => {
    if (risk === "High")
      return "Increase Towing";

    if (risk === "Medium")
      return "Deploy Officers";

    return "Routine Monitoring";
  };

  return (
    <div
      style={{
        margin: "40px",
        padding: "20px",
        background: "#1b2335",
        borderRadius: "12px",
      }}
    >
      <h2>Traffic Action Priority Queue</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Priority</th>
            <th>Station</th>
            <th>Risk</th>
            <th>Recommended Action</th>
          </tr>
        </thead>

        <tbody>
          {stations.map((station, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{station.police_station}</td>
              <td>{station.risk_level}</td>
              <td>{getAction(station.risk_level)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PriorityQueue;