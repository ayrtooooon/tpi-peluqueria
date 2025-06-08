import { useEffect, useState, useContext } from "react";
import { Button, Table } from "react-bootstrap";
import { successToast, errorToast } from "../components/ui/toast/NotificationToast";
import { AuthenticationContext } from "../components/services/auth.context";

const BarberView = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useContext(AuthenticationContext);

  const fetchAppointments = async () => {
  try {
    const res = await fetch("http://localhost:3000/appointments");
    if (!res.ok) throw new Error("Error al obtener turnos");
    const data = await res.json();
    setAppointments(data);
  } catch (err) {
    errorToast(err.message);
  }
};


  const handleTakeAppointment = async (appointmentId) => {
    console.log("Usuario logueado:", user); // Verificamos qué viene
    try {
      const res = await fetch(`http://localhost:3000/appointments/${appointmentId}/assign`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barber_id: user.user_id }),
      });
      if (!res.ok) throw new Error("Error al tomar el turno");
      successToast("Turno asignado correctamente");
      fetchAppointments();
    } catch (err) {
      errorToast(err.message);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="container mt-5">
      <h3>Turnos disponibles</h3>
      <Table striped bordered hover>
        <thead>
  <tr>
    <th>ID Cliente</th>
    <th>Servicio</th>
    <th>Fecha</th>
    <th>Hora</th>
    <th>Estado</th>
    <th>Acciones</th>
  </tr>
</thead>
<tbody>
  {appointments.map((appt) => (
    <tr key={appt.appointment_id}>
      <td>{appt.customer_id}</td>
      <td>{appt.service}</td>
      <td>{appt.appointment_date}</td>
      <td>{appt.appointment_time}</td>
      <td>{appt.status}</td>
      <td>
        <Button
          variant="primary"
          size="sm"
          onClick={() => handleTakeAppointment(appt.appointment_id)}
          disabled={appt.barber_id !== null || appt.status !== "Pendiente"}
        >
          Tomar turno
        </Button>
      </td>
    </tr>
  ))}
</tbody>

      </Table>
    </div>
  );
};

export default BarberView;
