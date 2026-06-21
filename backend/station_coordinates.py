import pandas as pd

parking_df = pd.read_csv("C:\\Users\\vanda\\OneDrive\\Desktop\\trafficpulse-ai\\data\\parking.csv")

station_coords = (
    parking_df
    .groupby("police_station")[["latitude", "longitude"]]
    .mean()
    .reset_index()
)

print(station_coords.head())

station_coords.to_csv(
    "../data/station_coordinates.csv",
    index=False
)

print("Saved station coordinates!")