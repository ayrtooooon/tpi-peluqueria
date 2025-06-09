import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import {
  successToast,
  errorToast,
} from "../components/ui/toast/NotificationToast";

const CostumerView = () => {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    service: "",
    appointment_date: "",
    appointment_time: "",
  });

  const fetchTurnosCliente = async () => {
    const clienteId = localStorage.getItem("user_id");
    if (!clienteId) {
      errorToast("No se pudo identificar al cliente.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:3000/appointments?customer_id=${clienteId}`
      );
      const data = await res.json();
      setTurnos(data);
    } catch (err) {
      errorToast("Error al obtener los turnos.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const clienteId = localStorage.getItem("user_id");
    if (!clienteId) {
      errorToast("No se pudo identificar al cliente.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          customer_id: clienteId,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error al crear el turno");
      }
      successToast("Turno creado correctamente.");
      setForm({ service: "", appointment_date: "", appointment_time: "" });
      fetchTurnosCliente();
    } catch (err) {
      errorToast(err.message || "Error al crear el turno.");
    }
  };

  useEffect(() => {
    fetchTurnosCliente();
  }, []);

  if (loading) {
    return <p className="text-center mt-5">Cargando tus turnos...</p>;
  }

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow mb-4">
        <Card.Body>
          <h4 className="mb-3">Reservar nuevo turno</h4>
          <Form onSubmit={handleSubmit}>
            <Row className="g-2">
              <Col md={4}>
                <Form.Select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="Corte">Corte</option>
                  <option value="Corte y barba">Corte y barba</option>
                  <option value="Peinado">Peinado</option>
                  <option value="Coloracion">Coloración</option>
                  <option value="Barba">Barba</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <Form.Control
                  type="date"
                  name="appointment_date"
                  value={form.appointment_date}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  type="time"
                  name="appointment_time"
                  value={form.appointment_time}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={2}>
                <Button type="submit" variant="primary" className="w-100">
                  Reservar
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <Card className="p-4 shadow">
        <Card.Body>
          <h3 className="mb-4">Mis turnos</h3>
          {turnos.length === 0 ? (
            <p className="text-muted">No tenés turnos reservados.</p>
          ) : (
            <Row className="g-4">
              {turnos.map((turno) => (
                <Col md={4} key={turno.id}>
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title className="mb-3">
                        Servicio: {turno.service}
                      </Card.Title>
                      <Card.Text>
                        <strong>Fecha:</strong> {turno.appointment_date}
                        <br />
                        <strong>Hora:</strong> {turno.appointment_time}
                        <br />
                        <strong>Estado:</strong> {turno.status || "Pendiente"}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CostumerView;
