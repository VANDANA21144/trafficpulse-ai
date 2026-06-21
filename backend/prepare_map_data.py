import pandas as pd

tvi = pd.read_csv("C:\\Users\\vanda\\OneDrive\\Desktop\\trafficpulse-ai\\data\\tvi_v2_results.csv")

coords = pd.read_csv("C:\\Users\\vanda\\OneDrive\\Desktop\\trafficpulse-ai\\data\\station_coordinates.csv")

map_data = tvi.merge(
    coords,
    on="police_station",
    how="left"
)

print(map_data.head())

map_data.to_csv(
    "../data/map_data.csv",
    index=False
)

print("Map data saved!")