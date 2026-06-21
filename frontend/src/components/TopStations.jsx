import { useEffect, useState } from "react";
import API from "../api/api";

function TopStations() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    API.get("/top-stations")
      .then((res) => {
        setStations(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div style={{ margin: "40px" }}>
      <h2>Top Vulnerable Stations</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Rank</th>
            <th>Police Station</th>
            <th>TVI</th>
            <th>Risk Level</th>
          </tr>
        </thead>

        <tbody>
          {stations.map((station, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
              <td>{station.police_station}</td>
              <td>{station.TVI.toFixed(2)}</td>
              <td>
  <span
    style={{
      padding: "5px 10px",
      borderRadius: "8px",
      color: "white",
      backgroundColor:
        station.risk_level === "High"
          ? "orange"
          : station.risk_level === "Critical"
          ? "red"
          : station.risk_level === "Medium"
          ? "yellow"
          : "green",
    }}
  >
    {station.risk_level}
  </span>
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopStations;