import { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthenticationContext } from "./services/auth.context";

function NavBar() {
  const { user, isLoggedIn } = useContext(AuthenticationContext);

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
            <Nav.Link as={Link} to="/services">
              Servicios
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contacto
            </Nav.Link>
          </Nav>
          <Nav>
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="text-decoration-none me-3 text-dark"
                >
                  Iniciar sesión
                </Link>
                <Link to="/register" className="text-decoration-none text-dark">
                  Registrarse
                </Link>
              </>
            ) : (
              <NavDropdown title={user?.name} id="user-dropdown">
                <NavDropdown.Item as={Link} to="/perfil">
                  Mi perfil
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/logout">
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
