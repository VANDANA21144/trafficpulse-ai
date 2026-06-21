import Header from "./components/Header";
import DashboardCards from "./components/DashboardCards";
import TopStations from "./components/TopStations";
import Simulator from "./components/Simulator";
import RiskMap from "./components/RiskMap";
import Recommendation from "./components/Recommendation";
import PriorityQueue from "./components/PriorityQueue";

function App() {
  return (
    <>
      <Header />
      <DashboardCards />
      <TopStations />
      <RiskMap />
      <PriorityQueue />
      <Recommendation />
      <Simulator />
    </>
  );
}

export default App;