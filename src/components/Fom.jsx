import { useState } from "react";

const Form = ({ onSubmit, errores, refs, formEnviado }) => {
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
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label>Nombre del cliente: </label>
        <input
          type="text"
          name="nombreCliente"
          value={formData.nombreCliente}
          onChange={handleChange}
          ref={refs.nombreClienteRef}
        />
        {errores.nombreCliente && (
          <p style={{ color: "red" }}>{errores.nombreCliente}</p>
        )}
      </div>

      <div>
        <label>Fecha: </label>
        <input
          type="date"
          name="fecha"
          value={formData.fecha}
          onChange={handleChange}
          ref={refs.fechaRef}
        />
        {errores.fecha && <p style={{ color: "red" }}>{errores.fecha}</p>}
      </div>

      <div>
        <label>Hora: </label>
        <input
          type="time"
          name="hora"
          value={formData.hora}
          onChange={handleChange}
          ref={refs.horaRef}
        />
        {errores.hora && <p style={{ color: "red" }}>{errores.hora}</p>}
      </div>

      <div>
        <label>Servicio: </label>
        <select
          name="servicio"
          value={formData.servicio}
          onChange={handleChange}
          ref={refs.servicioRef}
        >
          <option value="">-- Seleccionar --</option>
          <option value="Corte">Corte</option>
          <option value="Corte y barba">Corte y barba</option>
          <option value="Peinado">Peinado</option>
          <option value="Coloración">Coloración</option>
          <option value="Barba">Barba</option>
        </select>
        {errores.servicio && <p style={{ color: "red" }}>{errores.servicio}</p>}
      </div>

      <button type="submit">Reservar turno</button>

      {formEnviado && (
        <p style={{ color: "green" }}>Turno reservado con éxito</p>
      )}
    </form>
  );
};

export default Form;
