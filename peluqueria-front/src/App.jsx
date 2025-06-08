import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import FormPage from "./pages/FormPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import BarberView from "./pages/BarbersView";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminView from "./pages/AdminView";
import AdminRoute from "./components/routes/AdminRoute";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        <NavBar />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/turnos" element={<FormPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register></Register>} />
            <Route path="/profile" element={<Profile />}></Route>
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminView />
                </AdminRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/barbersView" element={<BarberView />} />
            <Route path="/services" element={<Services />}></Route>
          </Routes>
        </main>
        <ToastContainer />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
