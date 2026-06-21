import { useEffect, useState } from "react";
import API from "../api/api";
import L from "leaflet";


import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

function RiskMap() {
  const [stations, setStations] = useState([]);

  useEffect(() => {
    API.get("/map-data")
      .then((res) => {
        setStations(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const getIcon = (risk) => {
  if (risk === "Critical") return redIcon;
  if (risk === "High") return orangeIcon;
  if (risk === "Medium") return yellowIcon;
  return greenIcon;
};
  return (
    <div style={{ margin: "40px" }}>
      <h2>Bangalore Traffic Risk Map</h2>

      <MapContainer
        center={[12.9716, 77.5946]}
        zoom={11}
        style={{
          height: "500px",
          width: "100%",
        }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {stations.map((station, index) => (
          <Marker
            key={index}
            position={[
              station.latitude,
              station.longitude,
            ]}
            icon={getIcon(station.risk_level)}
          >
            <Popup>
              <b>{station.police_station}</b>

              <br />

              TVI:
              {" "}
              {station.TVI.toFixed(2)}

              <br />

              Risk:
              {" "}
              {station.risk_level}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default RiskMap;


const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const orangeIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const yellowIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const greenIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});