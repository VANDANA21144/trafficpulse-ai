from fastapi import FastAPI
import pandas as pd
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


df = pd.read_csv("C:\\Users\\vanda\\OneDrive\\Desktop\\trafficpulse-ai\\data\\tvi_v2_results.csv")
map_df = pd.read_csv("C:\\Users\\vanda\\OneDrive\\Desktop\\trafficpulse-ai\\data\\map_data.csv")
class SimulationRequest(BaseModel):
    station_name: str
    action: str

@app.get("/")
def home():
    return {"message": "TrafficPulse AI API Running"}

@app.get("/top-stations")
def top_stations():

    top10 = (
        df[
            ["police_station", "TVI", "risk_level"]
        ]
        .sort_values("TVI", ascending=False)
        .head(10)
    )

    return top10.to_dict(orient="records")

@app.get("/station/{station_name}")
def get_station(station_name: str):

    station = df[
        df["police_station"].str.lower()
        == station_name.lower()
    ]

    if station.empty:
        return {"error": "Station not found"}

    return station.to_dict(orient="records")[0]

@app.post("/simulate")
def simulate(request: SimulationRequest):

    station = df[
        df["police_station"].str.lower()
        == request.station_name.lower()
    ]

    if station.empty:
        return {"error": "Station not found"}

    current_tvi = float(station.iloc[0]["TVI"])

    action_impacts = {
        "deploy_officers": 10,
        "increase_towing": 15,
        "traffic_diversion": 12,
        "combined_action": 25
    }

    reduction = action_impacts.get(
        request.action,
        0
    )

    new_tvi = max(0, current_tvi - reduction)

    return {
        "station": request.station_name,
        "current_tvi": round(current_tvi, 2),
        "action": request.action,
        "new_tvi": round(new_tvi, 2),
        "improvement": reduction
    }

@app.get("/map-data")
def get_map_data():

    return map_df[
        [
            "police_station",
            "TVI",
            "risk_level",
            "latitude",
            "longitude",
        ]
    ].to_dict(orient="records")

@app.get("/summary")
def get_summary():

    critical = len(df[df["risk_level"] == "Critical"])

    high = len(df[df["risk_level"] == "High"])

    total = len(df)

    return {
        "critical": critical,
        "high": high,
        "total": total
    }

@app.get("/recommendation/{station_name}")
def recommendation(station_name: str):

    station = df[
        df["police_station"].str.lower()
        == station_name.lower()
    ]

    if station.empty:
        return {"error": "Station not found"}

    row = station.iloc[0]

    if row["TVI"] >= 60:
        action = "Increase Towing Enforcement"
        priority = "Immediate"

    elif row["TVI"] >= 45:
        action = "Deploy Additional Officers"
        priority = "High"

    elif row["TVI"] >= 30:
        action = "Periodic Patrols"
        priority = "Medium"

    else:
        action = "Routine Monitoring"
        priority = "Low"

    return {
        "station": row["police_station"],
        "tvi": float(row["TVI"]),
        "risk": row["risk_level"],
        "action": action,
        "priority": priority
    }