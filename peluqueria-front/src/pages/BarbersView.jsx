import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  successToast,
  errorToast,
} from "../components/ui/toast/NotificationToast";

const BarberView = () => {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTurnosNoAsignados = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/appointments?unassigned=true"
      );
      const data = await res.json();
      setTurnos(data);
    } catch (err) {
      errorToast("Error al obtener los turnos.");
    } finally {
      setLoading(false);
    }
  };

  const handleAsignarTurno = async (turnoId) => {
    const barberId = localStorage.getItem("user_id");

    if (!barberId) {
      errorToast("No se pudo identificar al barbero.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/appointments/${turnoId}/assign`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ barber_id: barberId }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Error al asignar turno");
      }

      successToast("Turno asignado correctamente.");
      setTurnos((prev) => prev.filter((t) => t.id !== turnoId));
    } catch (err) {
      errorToast(err.message || "Error al asignar el turno.");
    }
  };

  useEffect(() => {
    fetchTurnosNoAsignados();
  }, []);

  console.log(turnos);

  if (loading) {
    return <p className="text-center mt-5">Cargando turnos...</p>;
  }

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <Card.Body>
          <h3 className="mb-4">Turnos sin asignar</h3>
          <p className="mb-4">Seleccioná los turnos que vas a atender:</p>

          {turnos.length === 0 ? (
            <p className="text-muted">No hay turnos pendientes para asignar.</p>
          ) : (
            <Row className="g-4">
              {turnos.map((turno) => (
                <Col md={4} key={turno.id}>
                  <Card className="h-100 shadow-sm">
                    <Card.Body>
                      <Card.Title className="mb-3">
                        Cliente: {turno.customer?.name || turno.customer_id}
                      </Card.Title>
                      <Card.Text>
                        <strong>Servicio:</strong> {turno.service}
                        <br />
                        <strong>Fecha:</strong> {turno.appointment_date}
                        <br />
                        <strong>Hora:</strong> {turno.appointment_time}
                      </Card.Text>
                      <div className="d-flex justify-content-end">
                        <Button onClick={() => handleAsignarTurno(turno.id)}>
                          Atender cliente
                        </Button>
                      </div>
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

export default BarberView;
