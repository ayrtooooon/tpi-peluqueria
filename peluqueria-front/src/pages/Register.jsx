import React from 'react'
import { useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { errorToast, successToast } from '../components/ui/toast//NotificationToast';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errors, setErrors] = useState({ email: false, password: false });
    const [formEnviado, setFormEnviado] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email) {
            setErrors({ ...errors, email: true });
            return;
        }

        if (!password) {
            setErrors({ ...errors, password: true });
            return;
        } else {
            setTimeout(() => navigate("/login"), 1000);
        }

        const newUser = {
            name,
            email,
            password
        };

        try {
            const res = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser)
            });

            if (!res.ok) {
                errorToast("Error al registrar usuario.")
            }

            const userId = await res.json();

            successToast("Usuario registrado exitosamente. Inicie sesión para continuar.")
            navigate("/login");

        } catch (err) {
            errorToast("Error al registar usuario.");
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-start w-100" style={{ paddingTop: "150px", minHeight: "100vh" }}>
            <Card className="p-4 shadow" style={{ minWidth: "400px" }}>
                <Card.Body>
                    <Row className="mb-3">
                        <h5>Registro</h5>
                    </Row>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup className="mb-3">
                            <Form.Control
                                type="text"
                                required
                                placeholder="Ingresar nombre de usuario"
                                onChange={handleNameChange}
                                value={name}
                            />
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Control
                                type="email"
                                className={errors.email && 'border border-danger'}
                                required
                                placeholder="Ingresar email"
                                onChange={handleEmailChange}
                                value={email}
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
                            />
                        {errors.password && <p>El password es requerido.</p>}
                        </FormGroup>
                            <div className="d-flex justify-content-center">
                                <Button variant="secondary" type="submit">
                                    Registrarse
                                </Button>
                            </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Register;