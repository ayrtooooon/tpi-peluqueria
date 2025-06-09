import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import {
  successToast,
  errorToast,
} from "../components/ui/toast/NotificationToast";
import { AuthenticationContext } from "../components/services/auth.context";

const CostumerView = () => {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthenticationContext);
  const [form, setForm] = useState({
    service: "",
    appointment_date: "",
    appointment_time: "",
  });

  const fetchTurnosCliente = async () => {
    if (!user?.user_id) {
      errorToast("No se pudo identificar al cliente.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:3000/appointments?customer_id=${user.user_id}`
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

    if (!user?.user_id) {
      errorToast("No se pudo identificar al cliente.");
      return;
    }

    if (isPastDate(form.appointment_date)) {
      errorToast("No podés reservar para días pasados.");
      return;
    }

    if (isClosedDay(form.appointment_date)) {
      errorToast("La peluquería está cerrada los domingos.");
      return;
    }

    if (!isValidHour(form.appointment_time)) {
      errorToast("La hora debe estar entre las 08:00 y las 20:00.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          customer_id: user.user_id,
          customer_name: user.name || user.username || "Nombre no disponible",
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error al crear el turno");
      }

      successToast("Turno creado correctamente.");
      setForm({
        service: "",
        appointment_date: "",
        appointment_time: "",
      });
      fetchTurnosCliente();
    } catch (err) {
      errorToast(err.message || "Error al crear el turno.");
    }
  };

  useEffect(() => {
    fetchTurnosCliente();
  }, [user]);

  // Genera las opciones de horario cada 30 min desde las 08:00 hasta las 20:00
  const generarOpcionesHora = () => {
    const opciones = [];
    for (let h = 8; h <= 20; h++) {
      const horaStr = h.toString().padStart(2, "0");
      opciones.push(`${horaStr}:00`);
      if (h < 20) opciones.push(`${horaStr}:30`);
    }
    return opciones;
  };

  if (loading) {
    return <p className="text-center mt-5">Cargando tus turnos...</p>;
  }

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow mb-4">
        <Card.Body>
          <h4 className="mb-3">Reservar nuevo turno</h4>
          <Form onSubmit={handleSubmit}>
            <Row className="g-2 mb-3">
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
                <Form.Select
                  name="appointment_time"
                  value={form.appointment_time}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar hora</option>
                  {generarOpcionesHora().map((hora, idx) => (
                    <option key={idx} value={hora}>
                      {hora}
                    </option>
                  ))}
                </Form.Select>
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

// Validaciones auxiliares
function isPastDate(dateStr) {
  const hoy = new Date();
  const fecha = new Date(dateStr);
  hoy.setHours(0, 0, 0, 0);
  fecha.setHours(0, 0, 0, 0);
  return fecha < hoy;
}

function isClosedDay(dateStr) {
  const fecha = new Date(dateStr);
  return fecha.getDay() === 0; // Domingo
}

function isValidHour(timeStr) {
  const [hora, minutos] = timeStr.split(":").map(Number);
  return hora >= 8 && (hora < 20 || (hora === 20 && minutos === 0));
}

export default CostumerView;