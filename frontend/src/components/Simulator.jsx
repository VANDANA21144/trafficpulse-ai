import { useState } from "react";
import API from "../api/api";

function Simulator() {
  const [station, setStation] = useState("HAL Old Airport");
  const [action, setAction] = useState("increase_towing");
  const [result, setResult] = useState(null);

  const runSimulation = async () => {
    try {
      const response = await API.post("/simulate", {
        station_name: station,
        action: action,
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        margin: "40px",
        padding: "20px",
        border: "1px solid #444",
        borderRadius: "10px",
      }}
    >
      <h2>Traffic Response Simulator</h2>

      <div style={{ marginBottom: "15px" }}>
        <label>Station:</label>
        <br />

        <select
          value={station}
          onChange={(e) => setStation(e.target.value)}
        >
          <option>HAL Old Airport</option>
          <option>Upparpet</option>
          <option>Halasuru Gate</option>
          <option>Shivajinagar</option>
          <option>Kodigehalli</option>
        </select>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label>Action:</label>
        <br />

        <select
          value={action}
          onChange={(e) => setAction(e.target.value)}
        >
          <option value="deploy_officers">
            Deploy Officers
          </option>

          <option value="increase_towing">
            Increase Towing
          </option>

          <option value="traffic_diversion">
            Traffic Diversion
          </option>

          <option value="combined_action">
            Combined Action
          </option>
        </select>
      </div>

      <button onClick={runSimulation}>
        Simulate
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Simulation Result</h3>

          <p>
            Current TVI:
            {" "}
            {result.current_tvi}
          </p>

          <p>
            Predicted TVI:
            {" "}
            {result.new_tvi}
          </p>

          <p>
            Improvement:
            {" "}
            {result.improvement}
          </p>
        </div>
      )}
    </div>
  );
}

export default Simulator;