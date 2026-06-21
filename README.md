# TrafficPulse AI

## Overview

TrafficPulse AI is an AI-powered Traffic Vulnerability Intelligence Platform designed to help traffic authorities proactively identify congestion-prone zones and recommend intervention strategies.

The system analyzes parking violations, traffic events, and road closures to compute a Traffic Vulnerability Index (TVI) for each police station zone.

## Key Features

* Traffic Vulnerability Index (TVI) Calculation
* Risk-Based Station Ranking
* Interactive Risk Map
* AI Recommendation Engine
* Traffic Action Priority Queue
* Traffic Response Simulator

## Technology Stack

### Frontend

* React.js
* Vite
* Axios
* React Leaflet

### Backend

* FastAPI
* Python
* Pandas

### Data Processing

* Parking Violations Dataset
* Traffic Events Dataset
* Road Closure Analysis

## Project Workflow

1. Collect parking and event data.
2. Calculate Traffic Vulnerability Index (TVI).
3. Rank police station zones by risk.
4. Visualize risk hotspots on an interactive map.
5. Generate AI-based recommendations.
6. Simulate traffic management interventions.

## Running the Project

### Backend

```bash
cd backend
python -m uvicorn app:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL:

http://localhost:5173

Backend URL:

http://127.0.0.1:8000

## Team

Tulluru's Team

## Hackathon

Gridlock Hackathon 2.0 – Round 2
