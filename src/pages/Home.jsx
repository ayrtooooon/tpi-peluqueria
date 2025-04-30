import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Home peluquería</h1>
      <Button variant="primary" onClick={() => navigate("/formulario")}>
        Registrarse
      </Button>
    </div>
  );
};

export default Home;
