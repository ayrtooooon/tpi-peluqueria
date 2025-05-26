import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <Container>
        <Row>
          <Col md={6}>
            <p className="mb-0">
              &copy; 2025 Peluquería. Todos los derechos reservados.
            </p>
          </Col>
          <Col md={6}>
            <p className="mb-0">Contacto: peluqueria@app.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
