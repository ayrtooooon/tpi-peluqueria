import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-light py-3 mt-4 border-top">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="mb-0">
              &copy; 2025 Peluquería. Todos los derechos reservados.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <Link to="/" className="text-decoration-none me-3 text-dark">
              Inicio
            </Link>
            <Link to="/turnos" className="text-decoration-none me-3 text-dark">
              Turnos
            </Link>
            <Link to="/login" className="text-decoration-none me-3 text-dark">
              Iniciar sesión
            </Link>
            <Link to="/register" className="text-decoration-none text-dark">
              Registrarse
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
