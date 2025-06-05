import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import {
  successToast,
  errorToast,
} from "../components/ui/toast/NotificationToast";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      errorToast(err.message || "Error al obtener los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  const handleMakeBarber = async (userId) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${userId}/barber`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "barber" }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al asignar el rol");
      }

      successToast("Rol asignado correctamente.");
      fetchUsers(); // Refresh the list
    } catch (err) {
      errorToast(err.message || "Hubo un problema.");
    }
  };

  const handleRevertToCustomer = async (userId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/users/${userId}/customer`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: "customer" }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al revertir el rol");
      }

      successToast("Rol revertido correctamente.");
      fetchUsers(); // Refresh the list
    } catch (err) {
      errorToast(err.message || "Hubo un problema.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <div className="container mt-5">
      <h3>Gestión de Usuarios</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleMakeBarber(user.user_id)}
                >
                  Asignar rol barber
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleRevertToCustomer(user.user_id)}
                >
                  Revertir a cliente
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManageUsers;
