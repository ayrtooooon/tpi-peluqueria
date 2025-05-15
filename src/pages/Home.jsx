import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home peluquería</h1>
      <button onClick={() => navigate("/formulario")}>Turnos</button>
      <button onClick={() => navigate("/login")}>Registrarse</button>
    </div>
  );
};

export default Home;
