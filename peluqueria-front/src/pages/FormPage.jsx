import FormularioReserva from "../components/ReservationForm";
import Validations from "../components/Validations";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function FormPage({setIsLoggedIn}) {
  const nombreClienteRef = useRef(null);
  const fechaRef = useRef(null);
  const horaRef = useRef(null);
  const servicioRef = useRef(null);

  const [errores, setErrores] = useState({});
  const [formEnviado, setFormEnviado] = useState(false);
  const navigate = useNavigate();

  const manejarEnvio = async (formData) => {
  const errores = Validations({ datos: formData });

  if (Object.keys(errores).length > 0) {
    if (errores.nombreCliente && nombreClienteRef.current) {
      nombreClienteRef.current.focus();
    } else if (errores.fecha && fechaRef.current) {
      fechaRef.current.focus();
    } else if (errores.hora && horaRef.current) {
      horaRef.current.focus();
    } else if (errores.servicio && servicioRef.current) {
      servicioRef.current.focus();
    }

    setErrores(errores);
  } else {
    try {
      const userId = localStorage.getItem("customer_id");
      const response = await fetch("http://localhost:3000/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointment_date: formData.fecha,
          appointment_time: formData.hora,
          service: formData.servicio,
          customer_id: parseInt(userId),
          barber_id: null, // porque el barbero lo asigna más tarde
        }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar el turno");
      }

      alert("Reserva enviada con éxito");
      setErrores({});
      setIsLoggedIn?.(true); // usar `?.` por si no se pasó como prop
      setFormEnviado(true);
      setTimeout(() => navigate("/turnos"), 2000);
    } catch (error) {
      alert("Hubo un error al guardar el turno");
      console.error(error);
    }
    }
  };

  return (
    <div>
      <FormularioReserva
        onSubmit={manejarEnvio}
        errores={errores}
        refs={{
          nombreClienteRef,
          fechaRef,
          horaRef,
          servicioRef,
        }}
        formEnviado={formEnviado}
      />
    </div>
  );
}

export default FormPage;
