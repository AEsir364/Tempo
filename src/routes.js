import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cronometro from "./Pages/Cronometro";
import Temporizador from "./Pages/Temporizador";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Temporizador />} />
        <Route path="/cronometro" element={<Cronometro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
