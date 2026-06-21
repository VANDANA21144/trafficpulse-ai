import pandas as pd

parking_df = pd.read_csv("../data/parking.csv")
event_df = pd.read_csv("../data/events.csv")

# Parking score
parking_station = (
    parking_df.groupby("police_station")
    .size()
    .reset_index(name="parking_count")
)

# Event score
event_station = (
    event_df.groupby("police_station")
    .size()
    .reset_index(name="event_count")
)

# Closure score
closure_station = (
    event_df[event_df["requires_road_closure"] == True]
    .groupby("police_station")
    .size()
    .reset_index(name="closure_count")
)

# Merge
merged = parking_station.merge(
    event_station,
    on="police_station",
    how="inner"
)

merged = merged.merge(
    closure_station,
    on="police_station",
    how="left"
)

merged["closure_count"] = merged["closure_count"].fillna(0)

# Normalize
for col in ["parking_count", "event_count", "closure_count"]:
    merged[col + "_norm"] = (
        merged[col] - merged[col].min()
    ) / (
        merged[col].max() - merged[col].min()
    )

# TVI v2
merged["TVI"] = (
    0.5 * merged["parking_count_norm"] +
    0.3 * merged["event_count_norm"] +
    0.2 * merged["closure_count_norm"]
) * 100 


def get_risk_level(score):

    if score >= 70:
        return "Critical"
    elif score >= 50:
        return "High"
    elif score >= 30:
        return "Medium"
    else:
        return "Low"
    
merged["risk_level"] = merged["TVI"].apply(get_risk_level)


merged.sort_values(
    "TVI",
    ascending=False
).to_csv(
    "../data/tvi_v2_results.csv",
    index=False
)


print(
    merged[
        ["police_station", "TVI", "risk_level"]
    ]
    .sort_values("TVI", ascending=False)
    .head(10)
)