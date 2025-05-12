import { BrowserRouter, Route, Routes } from "react-router-dom";
import TreeGrid from "../components/zoneMonitoring/TreeGrid";
import ChartCompo from "../components/zoneMonitoring/Chart";

export default function Table() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TreeGrid />} />
        <Route path="/dashboard" element={<TreeGrid></TreeGrid>}></Route>
        <Route
          path="/components/zoneMonitoring/chart/:id"
          element={<ChartCompo></ChartCompo>}
        />
      </Routes>
    </BrowserRouter>
  );
}
