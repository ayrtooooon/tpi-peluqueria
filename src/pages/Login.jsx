import { useState, useRef } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { successToast, errorToast } from "../components/ui/toast/NotificationToast";


const Login = ({ setIsLogged }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ email: false, password: false });
    const navigate = useNavigate();
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!emailRef.current.value) {
            setErrors({ ...errors, email: true });
            emailRef.current.focus();
            return;
        }

        if (!passwordRef.current.value) {
            setErrors({ ...errors, password: true });
            passwordRef.current.focus();
            return;
        }

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(token => {
                localStorage.setItem("book-champions-token", token);
                successToast("Inicio de sesión exitoso.")
                setIsLogged(true);
                navigate("/libros");
            })
            .catch(err => {
                errorToast("Error al iniciar sesión.")
                return
            });
    };

    const handleNavigateToRegister = () => {
        navigate("/register");
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow" style={{ minWidth: "400px" }}>
                <Card.Body>
                    <Row className="mb-3">
                        <h5>Iniciar sesión</h5>
                    </Row>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="mb-3">
                            <Form.Control
                                type="email"
                                className={errors.email && 'border border-danger'}
                                required
                                placeholder="Ingresar email"
                                onChange={handleEmailChange}
                                value={email}
                                ref={emailRef}
                            />
                            {errors.email && <p>El email es requerido.</p>}
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Control
                                type="password"
                                className={errors.password && 'border border-danger'}
                                placeholder="Ingresar contraseña"
                                onChange={handlePasswordChange}
                                value={password}
                                ref={passwordRef}
                            />
                            {errors.password && <p>El password es requerido.</p>}
                        </FormGroup>
                        <Row className="mb-3">
                            <Col />
                            <Col md={6} className="d-flex justify-content-end">
                                <Button variant="secondary" type="submit">
                                    Iniciar sesión
                                </Button>
                            </Col>
                            <Col md={6} className="justify-content-center">
                                <p>¿Aún no tienes una cuenta?</p>
                                <Button variant="primary" onClick={handleNavigateToRegister}>
                                    Registrarse
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};


export default Login;