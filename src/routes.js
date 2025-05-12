import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cronometro from "./Pages/Cronometro";
import Temporizador from "./Pages/Temporizador";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cronometro />} />
        <Route path="/temporizador" element={<Temporizador />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
