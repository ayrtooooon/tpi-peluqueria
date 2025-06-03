import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar bg="light" data-bs-theme="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            alt="logo"
            src="./scissors.svg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Peluquería
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/servicios">
              Servicios
            </Nav.Link>
            <Nav.Link as={Link} to="/contacto">
              Contacto
            </Nav.Link>
          </Nav>
          <Nav>
            <Link to="/turnos" className="text-decoration-none me-3 text-dark">
              Turnos
            </Link>
            <Link to="/login" className="text-decoration-none me-3 text-dark">
              Iniciar sesión
            </Link>
            <Link to="/register" className="text-decoration-none text-dark">
              Registrarse
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
