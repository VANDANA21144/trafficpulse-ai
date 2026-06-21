import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("../data/tvi_results.csv")

top10 = df.sort_values(
    "TVI",
    ascending=False
).head(10)

plt.figure(figsize=(12,6))

plt.bar(
    top10["police_station"],
    top10["TVI"]
)

plt.xticks(rotation=45)
plt.ylabel("Traffic Vulnerability Index")
plt.xlabel("Police Station")
plt.title("Top 10 Traffic Vulnerability Zones")

plt.tight_layout()

plt.savefig("../data/top10_tvi.png")

plt.show()