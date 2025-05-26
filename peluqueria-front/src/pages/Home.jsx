import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Card } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <div className="bg-light p-5 rounded-lg m-3 text-center shadow">
        <h1 className="display-4">Bienvenido a nuestra Peluquería</h1>
        <p className="lead">
          Servicios profesionales de belleza y cuidado capilar
        </p>
        <hr className="my-4" />
        <p>Registrate para reservar tu cita ahora</p>

        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate("/login")}
          className="mt-3"
        >
          Registrarse
        </Button>
      </div>

      <Row className="mt-5">
        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="./cortepelo.jpg" />
            <Card.Body>
              <Card.Title>Cortes Modernos</Card.Title>
              <Card.Text>Los últimos estilos en cortes de cabello.</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="./coloracion.jpg" />
            <Card.Body>
              <Card.Title>Coloración Profesional</Card.Title>
              <Card.Text>
                Técnicas avanzadas de coloración y tratamientos capilares.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card>
            <Card.Img variant="top" src="./hombrebarba.jpg" />
            <Card.Body>
              <Card.Title>Barba</Card.Title>
              <Card.Text>Estilos mas modernos en cortes de barba.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-center mt-4 mb-5">
        <Button
          variant="outline-secondary"
          onClick={() => navigate("/servicios")}
          className="me-3"
        >
          Ver todos los servicios
        </Button>
        <Button variant="outline-primary" onClick={() => navigate("/contacto")}>
          Contacto
        </Button>
      </div>
    </Container>
  );
};

export default Home;
