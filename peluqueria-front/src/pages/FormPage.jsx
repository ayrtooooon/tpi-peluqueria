import FormularioReserva from "../components/ReservationForm";
import Validations from "../components/Validations";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function FormPage(setIsLoggedIn) {
  const nombreClienteRef = useRef(null);
  const fechaRef = useRef(null);
  const horaRef = useRef(null);
  const servicioRef = useRef(null);

  const [errores, setErrores] = useState({});
  const [formEnviado, setFormEnviado] = useState(false);
  const navigate = useNavigate();

  const manejarEnvio = (formData) => {
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
      alert("Reserva enviada con éxito");
      setErrores({});
      setIsLoggedIn(true);
      setFormEnviado(true);
      setTimeout(() => navigate("/turnos"), 2000);
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
