import { useEffect, useState } from "react";
import API from "../api/api";

function Recommendation() {

  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("/recommendation/HAL Old Airport")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!data) return null;

  return (
    <div
      style={{
        margin: "40px",
        padding: "20px",
        borderRadius: "12px",
        background: "#1b2335",
        color: "white",
      }}
    >
      <h2>AI Recommendation Engine</h2>

      <h3>{data.station}</h3>

      <p>
        <strong>Risk Level:</strong> {data.risk}
      </p>

      <p>
        <strong>Recommended Action:</strong> {data.action}
      </p>

      <p>
        <strong>Priority:</strong> {data.priority}
      </p>

      <p>
        <strong>Current TVI:</strong> {data.tvi.toFixed(2)}
      </p>
    </div>
  );
}

export default Recommendation;