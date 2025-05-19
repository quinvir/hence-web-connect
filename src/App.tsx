import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import LoginLayout from "./components/Templates/LoginLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
