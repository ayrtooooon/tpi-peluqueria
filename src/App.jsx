import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormPage from "./pages/FormPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formulario" element={<FormPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register></Register>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;