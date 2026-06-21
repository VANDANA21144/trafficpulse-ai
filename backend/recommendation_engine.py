import pandas as pd

df = pd.read_csv("../data/tvi_results.csv")

def get_recommendation(risk_level):

    if risk_level == "Critical":
        return """
Deploy 4-5 officers
Immediate towing enforcement
Activate diversion routes
Monitor continuously
"""

    elif risk_level == "High":
        return """
Deploy 3 officers
Increase parking enforcement
Monitor peak hours
"""

    elif risk_level == "Medium":
        return """
Periodic patrols
Monitor parking hotspots
"""

    else:
        return """
Routine monitoring
"""

for _, row in df.sort_values("TVI", ascending=False).head(5).iterrows():

    print("=" * 60)

    print("Police Station:", row["police_station"])
    print("TVI:", round(row["TVI"], 2))
    print("Risk:", row["risk_level"])

    print("\nRecommended Actions:")

    print(get_recommendation(row["risk_level"]))