import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LiveTV from "./pages/LiveTV";
import ChampionProfilePage from "./pages/ChampionProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/live" element={<LiveTV />} />
        <Route path="/champions/:id" element={<ChampionProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
