import pandas as pd

# Load datasets
parking_df = pd.read_csv("../data/parking.csv")
event_df = pd.read_csv("../data/events.csv")

# Count parking violations by police station
parking_station = (
    parking_df.groupby("police_station")
    .size()
    .reset_index(name="parking_count")
)

# Count events by police station
event_station = (
    event_df.groupby("police_station")
    .size()
    .reset_index(name="event_count")
)

# Merge datasets
merged = parking_station.merge(
    event_station,
    on="police_station",
    how="inner"
)

# Normalize values
merged["parking_norm"] = (
    merged["parking_count"] - merged["parking_count"].min()
) / (
    merged["parking_count"].max() - merged["parking_count"].min()
)

merged["event_norm"] = (
    merged["event_count"] - merged["event_count"].min()
) / (
    merged["event_count"].max() - merged["event_count"].min()
)

# Traffic Vulnerability Index
merged["TVI"] = (
    0.6 * merged["parking_norm"]
    + 0.4 * merged["event_norm"]
) * 100

# Sort by risk
result = merged.sort_values(
    "TVI",
    ascending=False
)

def get_risk_level(tvi):
    if tvi >= 70:
        return "Critical"
    elif tvi >= 50:
        return "High"
    elif tvi >= 30:
        return "Medium"
    else:
        return "Low"
    

result["risk_level"] = result["TVI"].apply(get_risk_level)

print(result[
    ["police_station",
     "parking_count",
     "event_count",
     "TVI",
     "risk_level"
    ]
].head(10))


# Save results

result.to_csv(
    "../data/tvi_results.csv",
    index=False
)

print("\nTVI results saved successfully!")


