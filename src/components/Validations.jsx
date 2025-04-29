const Validations = ({ datos }) => {
  const errores = {};

  if (!datos.nombreCliente.trim()) {
    errores.nombreCliente = "El nombre del cliente es obligatorio";
  } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(datos.nombreCliente)) {
    errores.nombreCliente = "Solo se permiten letras";
  }

  if (!datos.fecha.trim()) {
    errores.fecha = "La fecha es obligatoria";
  }

  if (!datos.hora.trim()) {
    errores.hora = "La hora es obligatoria";
  }

  if (!datos.servicio.trim()) {
    errores.servicio = "El servicio es obligatorio";
  }

  return errores;
};

export default Validations;
