import { useState } from "react";
import { Button, Card, Form, Alert, Row, Col } from "react-bootstrap";

const ReservationForm = ({ onSubmit, errores, refs, formEnviado }) => {
  const [formData, setFormData] = useState({
    nombreCliente: "",
    fecha: "",
    hora: "",
    servicio: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="mt-5 mx-md-5 p-4 shadow">
      <Card.Header as="h2" className="bg-primary text-white">
        Reservar turno
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group as={Row} className="mb-3" controlId="nombreCliente">
            <Form.Label column sm={3}>
              Nombre del cliente:
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="text"
                name="nombreCliente"
                value={formData.nombreCliente}
                onChange={handleChange}
                ref={refs.nombreClienteRef}
                isInvalid={!!errores.nombreCliente}
                placeholder="Ingrese su nombre completo"
              />
              <Form.Control.Feedback type="invalid">
                {errores.nombreCliente}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="fecha">
            <Form.Label column sm={3}>
              Fecha:
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                ref={refs.fechaRef}
                isInvalid={!!errores.fecha}
              />
              <Form.Control.Feedback type="invalid">
                {errores.fecha}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="hora">
            <Form.Label column sm={3}>
              Hora:
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                type="time"
                name="hora"
                value={formData.hora}
                onChange={handleChange}
                ref={refs.horaRef}
                isInvalid={!!errores.hora}
              />
              <Form.Control.Feedback type="invalid">
                {errores.hora}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-4" controlId="servicio">
            <Form.Label column sm={3}>
              Servicio:
            </Form.Label>
            <Col sm={9}>
              <Form.Select
                name="servicio"
                value={formData.servicio}
                onChange={handleChange}
                ref={refs.servicioRef}
                isInvalid={!!errores.servicio}
              >
                <option value="">-- Seleccionar --</option>
                <option value="Corte">Corte</option>
                <option value="Corte y barba">Corte y barba</option>
                <option value="Peinado">Peinado</option>
                <option value="Coloración">Coloración</option>
                <option value="Barba">Barba</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errores.servicio}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit" size="lg">
              Reservar turno
            </Button>
          </div>

          {formEnviado && (
            <Alert variant="success" className="mt-3">
              Turno reservado con éxito
            </Alert>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ReservationForm;
