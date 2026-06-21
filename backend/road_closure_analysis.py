import pandas as pd

event_df = pd.read_csv("../data/events.csv")

road_closure = (
    event_df[event_df["requires_road_closure"] == True]
    .groupby("police_station")
    .size()
    .reset_index(name="closure_count")
)

print(
    road_closure.sort_values(
        "closure_count",
        ascending=False
    ).head(20)
)